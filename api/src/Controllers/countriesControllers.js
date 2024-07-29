const axios = require("axios");
const { Country, Activity } = require("../db.js");

// const deleteItem = async (req, res, next) => {
//   try{
//     const { id } = req.params;
//     const DelActivity = Activity.findByPk(id);
//     return DelActivity.destroy()
//   }catch{
//     return res.status(404).send("La actividad indicada no se encontró");
//   }
// }

const getAllCountries = async () => {
  try {
    const countriesDB = await Country.findAll();
    const apiUrl = await axios.get("https://restcountries.com/v3/all");
    if (!countriesDB.length) {
      const apiInfo = await apiUrl.data.map((c) => ({
        id: c.cca3,
        name: c.name.common.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
        image: c.flags[1],
        continents: c.continents.toString(),
        capital: c.capital ? c.capital.toString() : "Unknown",
        subregion: c.subregion,
        area: c.area,
        population: c.population,
      }));
      await Country.bulkCreate(apiInfo);
      console.log("países guardados en DB");
    }
  } catch (error) {
    console.log(error);
  }
};

const agregarActivity = async () => {
  return await Country.findAll({
    include: {
      model: Activity,
      attributes: ["name", "difficulty", "duration", "season"],
      through: {
        attributes: [],
      },
    },
  });
};

const getCountries = async (req, res, next) => {
  const { name } = req.query;
  const { id } = req.params;
  try {
    const countryMasActivity = await agregarActivity();
    if (name) {
      const countryName = countryMasActivity.filter((c) =>
        c.name.toLowerCase().includes(name.toLowerCase())
      );
      countryName.length
        ? res.status(200).json(countryName)
        : res
            .status(404)
            .send({ msg: "El nombre ingresado no corresponde a ningún país" });
    } else if (id) {
      const idFound = countryMasActivity.filter(
        (c) => c.id.toUpperCase() === id.toUpperCase()
      );
      idFound.length
        ? res.status(200).json(idFound)
        : res
            .status(404)
            .send({ msg: "El id ingresado no corresponde a ningún país" });
    } else {
      const countriesPcipal = countryMasActivity.filter((c) => ({
        id: c.id,
        image: c.flags,
        name: c.name,
        continents: c.continents,
        population: c.population,
        activities: c.activities,
      }));
      res.json(countriesPcipal);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCountries,
  getCountries,
};
