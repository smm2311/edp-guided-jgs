import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useData } from "../hooks/DataContext";

export function Planets() {

  const {characters, planets, films} = useData();

  return (
    <>
      {planets.map((planet) => (
        <div key={planet.name}>
          <Link to={`/planet/${planet.id}`} state={{ info: planet }}>
            {planet.name}
          </Link>
          <br />
        </div>
      ))}
    </>
  );
}
