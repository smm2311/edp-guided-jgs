import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function Characters() {
  const [characters, setCharacters] = useState([]);

  async function fetchCharacters() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL_BASE}/characters`
      );
      if (!res.ok) {
        throw new Error("api messed up");
      }
      const res_json = await res.json();
      setCharacters(res_json);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchCharacters();
  }, []);

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
