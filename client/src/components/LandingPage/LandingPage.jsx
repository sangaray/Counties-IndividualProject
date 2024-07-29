import React from "react";
import { Link } from "react-router-dom";
import lp from "./LandingPage.module.css";
import flags from "../../images/flags.gif";

function LandingPage() {
  return (
    <div className={lp.container}>
      <h1 className={lp.title}>Welcome to Travel Through the World App</h1>

      <img src={flags} alt="bandera flameando" />

      <div className={lp.buttonContainer}>
        <Link to="/home" className={lp.link}>
          <button className={lp.button}>Visit Our Site</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
