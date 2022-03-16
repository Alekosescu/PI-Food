import React from "react";
import './Paginado.css'

export default function Paginado({ recipesPerPage, allRecipes, paginado, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="ul">
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li key={number}>
              <button className={number === currentPage ? 'current' : 'paginate'}  onClick={() => paginado(number)}>
                {number}
              </button>
            </li>
          ))}
      </ul>
    </nav>
  );
}
