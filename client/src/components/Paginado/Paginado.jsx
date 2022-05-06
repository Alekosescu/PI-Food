import React from "react";

export default function Paginado({
  recipesPerPage,
  allRecipes,
  paginado,
  currentPage,
}) {
  // currentPage is the current page number
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="pagination justify-content-center d-flex justify-content-around opacity-75">
      {pageNumbers &&
        pageNumbers.map((number) => (
          <li key={number}>
            <button
              type="btn-group"
              className="btn btn-outline-success btn-lg"
              {...(number === currentPage ? "current" : "paginate")}
              onClick={() => paginado(number)}
            >
              {number}
            </button>
          </li>
        ))}
    </div>
  );
}
