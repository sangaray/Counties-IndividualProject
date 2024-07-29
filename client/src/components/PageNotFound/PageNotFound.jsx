import React from "react";
import { Link } from "react-router-dom";
import nf from "./PageNotFound.module.css";

export default function PageNotFound() {
  return (
    <div className={nf.container}>
      <div className={nf.containerA}>
        <h1 className={nf.letterA}>Page Not Found</h1>
      </div>
      <div className={nf.containerB}>
        <h3 className={nf.letterB}>
          OOPS! You are lost?... Go back to the main page
        </h3>
      </div>
      <Link to="/home">
        <button className={nf.btnGoBack}>{"<"} Go back</button>
      </Link>
    </div>
  );
}
