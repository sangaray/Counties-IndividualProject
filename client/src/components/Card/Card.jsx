import React from "react";
import { Link } from "react-router-dom";
import c from "./Card.module.css";

const CountryCard = ({ image, id, name, continents, population }) => {
  return (
    <div className={c.container}>
      <Link style={{ textDecoration: "none" }} to={`/detail/${id}`}>
        <div className={c.card}>
          <div className={c.imageContainer}>
            <img
              src={image}
              alt={`Flag of ${name}`}
              width="169px"
              height="113px"
            />
          </div>

          <div className={c.countryCard}>
            <div className={c.country}>
              <div className={c.titleCard}>
                <h2>{name}</h2>
              </div>
            </div>

            <div className={c.continent}>
              <div className={c.titleCont}>
                <h3>{continents}</h3>
              </div>
            </div>
          </div>

          <div className={c.population}>
            <div className={c.titlePop}>
              <h4 className={c.pop}>Population: {population}</h4>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CountryCard;
