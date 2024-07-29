const axios = require("axios");
const { Country, Activity } = require("../db.js");
const sequelize = require("sequelize");
const Op = sequelize.Op;

const newActivity = async (req, res, next) => {
  try {
    const { name, difficulty, duration, season, countries } = req.body;

    const [activityDb, created] = await Activity.findOrCreate({
      where: { name },
      defaults: { difficulty, duration, season },
    });

    for (let c of countries) {
      const relacionCountries = await Country.findOne({
        where: { name: { [Op.iLike]: c } },
      });
      activityDb.addCountry(relacionCountries);
    }

    created
      ? res.send({ msg: "La actividad fue creada con éxito" })
      : res.send({
          msg: "La actividad ya existía y fue relacionada con el país indicado",
        });
  } catch (error) {
    next(error);
  }
};

const getAllActivities = async (req, res, next) => {
  try {
    let activities = await Activity.findAll();
    activities.length
      ? res.status(200).json(activities)
      : res.status(404).json([]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  newActivity,
  getAllActivities,
};
