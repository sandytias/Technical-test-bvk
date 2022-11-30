import React, { useState } from "react";
import Details from "./Details";

const GetData = ({ dataCat }) => {
  const [show, setShow] = useState(false);
  // console.log('dataCAT', dataCat)
  // const image = dataCat.image.url
  return (
    <div className="recipe">
      <h2>{dataCat.name}</h2>
      <img
        src={dataCat?.image?.url}
        alt={dataCat.name}
        style={{ height: "350px" }}
      />
      <br />
      <button onClick={() => setShow(!show)} style={{ marginTop: "5px" }}>
        Details
      </button>
      {show && <Details dataCat={dataCat} />}
      {/* <Details dataCat={dataCat} /> */}
    </div>
  );
};

export default GetData;
