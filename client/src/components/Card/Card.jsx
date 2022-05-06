import React from "react";
import "./Card.css";

export default function Card({ name, image, typeDiets, id }) {
  return ( 
    <div className="mt-4 cardo">
      <div className="mt-4 container justify-content-around user-info h5">
        <h5 className='tag'>{name}</h5>
        <img className="cardo" src={image} alt="img not found" height={300}/>
        <h5 className='tag'>{typeDiets}</h5>
      </div>
    </div>
  );
}
