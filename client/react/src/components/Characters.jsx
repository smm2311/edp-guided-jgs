import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useData } from "../hooks/DataContext";

export function Characters() {

  const {characters, planets, films} = useData();

  return (
    <>
      {characters.map((character) => (
        <div key={character.name}>
          <Link to={`/character/${character.id}`} state={{ info: character }}>
            {character.name}
          </Link>
          <br />
        </div>
      ))}
    </>
  );
}
