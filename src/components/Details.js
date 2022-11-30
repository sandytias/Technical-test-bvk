import React from "react";
import { v4 as uuidv4 } from "uuid";
import "../App.css";

const Details = ({ dataCat }) => {
  return (
    <ul key={uuidv4()} className="ingredient-list">
      <li className="ingredient-text">Name : {dataCat.name}</li>
      <li className="ingredient-weight">Description : {dataCat.description}</li>
      <li className="ingredient-temp">Temprament : {dataCat.temperament}</li>
    </ul>
  );
};

export default Details;
