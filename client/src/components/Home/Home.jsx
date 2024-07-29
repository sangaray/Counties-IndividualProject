import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCountries,
  filterByContinent,
  filterByActivities,
  getActivities,
  orderByName,
  orderByPopulation,
} from "../../redux/actions/index.js";
import { Link } from "react-router-dom";
import Card from "../Card/Card.jsx";
import Paginado from "../Paginado/Paginado.jsx";
import h from "../Home/Home.module.css";
import SearchBar from "../SearchBar/SearchBar.jsx";

export default function Home() {
  const dispatch = useDispatch();

  const allCountries = useSelector((state) => state.countries);
  const allActivities = useSelector((state) => state.activities);

  const [order, setOrder] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(9);
  const indexLastCountry = currentPage * countriesPerPage; // 9
  const indexFirstCountry = indexLastCountry - countriesPerPage; //0
  const currentCountry = allCountries.slice(
    indexFirstCountry,
    indexLastCountry
  );

  const paginado = (currentPage) => {
    currentPage === 1 ? setCountriesPerPage(9) : setCountriesPerPage(10);
    setCurrentPage(currentPage);
  };

  const handlePrevPage = (e) => {
    e.preventDefault();
    if (currentPage === 2) {
      setCurrentPage(currentPage - 1);
      setCountriesPerPage(9);
    } else if (currentPage > 2) {
      setCurrentPage(currentPage - 1);
      setCountriesPerPage(10);
    }
  };

  const handleNextPage = (e) => {
    e.preventDefault();
    if (currentPage < Math.ceil(allCountries.length / 10)) {
      setCurrentPage(currentPage + 1);
      setCountriesPerPage(10);
    }
  };

  useEffect(() => {
    dispatch(getAllCountries());
    dispatch(getActivities());
  }, [dispatch]);

  function onHandleClick(event) {
    event.preventDefault();
    dispatch(getAllCountries());
  }

  function handleFilterByContinent(event) {
    event.preventDefault();
    dispatch(filterByContinent(event.target.value));
    setCurrentPage(1);
    setCountriesPerPage(9);
  }

  const handleFilterByActivities = (event) => {
    event.preventDefault();
    dispatch(filterByActivities(event.target.value));
    setCurrentPage(1);
    setCountriesPerPage(9);
  };

  const handleOrderByName = (event) => {
    event.preventDefault();
    dispatch(orderByName(event.target.value));
    setCurrentPage(1);
    setCountriesPerPage(9);
    setOrder(event.target.value);
  };

  const handleOrderByPopulation = (event) => {
    event.preventDefault();
    dispatch(orderByPopulation(event.target.value));
    setCurrentPage(1);
    setCountriesPerPage(9);
    setOrder(event.target.value);
  };

  return (
    <div className={h.container}>
      <div className={h.cover}>
        <SearchBar setCurrentPage={setCurrentPage} />

        <div className={h.backTitle}>
          <h1 className={h.title}> Visit your favourite country</h1>
        </div>

        <div className={h.btns}>
          <button className={h.sel} onClick={onHandleClick}>
            All Countries
          </button>
          <Link to="/activities">
            <button className={h.sel}>Create Activity</button>
          </Link>

          <select className={h.sel} onChange={handleOrderByName}>
            <option hidden>Sort By Country</option>
            <option className={h.opc} value="a-z">
              A - Z
            </option>
            <option className={h.opc} value="z-a">
              Z - A
            </option>
          </select>
          <select className={h.sel} onChange={handleOrderByPopulation}>
            <option hidden>Sort By Population</option>
            <option className={h.opc} value="asc">
              Ascending
            </option>
            <option className={h.opc} value="desc">
              Descending
            </option>
          </select>

          <select className={h.sel} onChange={handleFilterByContinent}>
            <option hidden>Filter By Continents</option>
            <option className={h.opc} value="North America">
              North America
            </option>
            <option className={h.opc} value="South America">
              South America
            </option>
            <option className={h.opc} value="Antarctica">
              Antarctica
            </option>
            <option className={h.opc} value="Europe">
              Europe
            </option>
            <option className={h.opc} value="Asia">
              Asia
            </option>
            <option className={h.opc} value="Africa">
              Africa
            </option>
            <option className={h.opc} value="Oceania">
              Oceania
            </option>
          </select>

          <select className={h.sel} onChange={handleFilterByActivities}>
            <option hidden>Filter By Activities</option>
            <option className={h.opc} value="all">
              All
            </option>
            {allActivities &&
              allActivities.map((c) => {
                return (
                  <option className={h.opc} key={c.id} value={c.name}>
                    {c.name}
                  </option>
                );
              })}
          </select>
        </div>
      </div>

      <div className={h.page}>
        <Paginado
          countriesPerPage={countriesPerPage}
          allCountries={allCountries.length}
          paginado={paginado}
          setCurrentPage={setCurrentPage}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
        />
      </div>

      <div className={h.cards}>
        {currentCountry?.map((c) => {
          return (
            <Card
              key={c.id}
              id={c.id}
              image={c.image}
              name={c.name}
              continents={c.continents}
              population={c.population}
            />
          );
        })}
      </div>
    </div>
  );
}
