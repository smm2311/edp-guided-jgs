import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useData } from "../hooks/DataContext";

export function Films() {

  const {characters, planets, films} = useData();

  return (
    <>
      {films.map((film) => (
        <div key={film.id}>
          <Link to={`/film/${film.id}`} state={{ info: film }}>
            {film.title}
          </Link>
          <br />
        </div>
      ))}
    </>
  );
}
