import React from "react";
import pag from "./Paginado.module.css";

export default function Paginado({
  allCountries,
  paginado,
  handlePrevPage,
  handleNextPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allCountries / 10); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className="formato">
      <ul className="pagination">
        <li>
          <button onClick={handlePrevPage}>{`<`}</button>
        </li>
        {pageNumbers &&
          pageNumbers.map((currentPage) => (
            <li className="number" key={currentPage}>
              <a onClick={() => paginado(currentPage)}>
                <div className={pag.numContainer}>{currentPage}</div>
              </a>
            </li>
          ))}
        <li onClick={handleNextPage}>
          <button>{`>`}</button>
        </li>
      </ul>
    </nav>
  );
}
