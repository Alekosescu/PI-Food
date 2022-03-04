import React from "react";

export default function Paginado({ recipesPerPage, allRecipes, paginado }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <div>
        <ul>
          {pageNumbers.map((number) => (
            <button key={number} onClick={() => paginado(number)}>
              {number}
            </button>
          ))}
        </ul>
      </div>
    </nav>
  );
}
