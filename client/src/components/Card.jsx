import React from "react";
import "./Card.css";

export default function Card({ name, image, typeDiets, id }) {
  return (
    <div className='cards'>
      <h3>{name}</h3>
      <img className='cards:hover' src={image} alt="img not found" width="200px" height="250px" />
      <h3>{typeDiets}</h3>
    </div>
  );
}
