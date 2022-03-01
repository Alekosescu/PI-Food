import React from "react";

export default function Card({ name, image, typeDiets, id }) {
  return (
    <div>
      <h3>{name}</h3>
      <img src={image} alt="img not found" width="200px" height="250px" />
      <h3>{typeDiets}</h3>
    </div>
  );
}
