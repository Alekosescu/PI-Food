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
              <a className={number === currentPage ? 'current' : 'paginate'} href={() => false} onClick={() => paginado(number)}>
                {number}
              </a>
            </li>
          ))}
      </ul>
    </nav>
  );
}
