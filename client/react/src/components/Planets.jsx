import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search } from "./Search";

export function Planets() {
  const [planets, setPlanets] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  async function fetchPlanets() {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL_BASE}/planets`);
      if (!res.ok) {
        throw new Error("api messed up");
      }
      const res_json = await res.json();
      setPlanets(res_json);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchPlanets();
  }, []);

  return (
    <>
      <Search
        dataNames={planets.map((c) => c.name)}
        setSearchResults={setSearchResults}
      />
      {searchResults.length === 0
        ? planets.map((planet) => (
            <div key={planet.name}>
              <Link to={`/planet/${planet.id}`} state={{ info: planet }}>
                {planet.name}
              </Link>
              <br />
            </div>
          ))
        : searchResults.map((name) => {
          const planet = planets.find((c) => c.name === name);
          return (
            <div key={planet.name}>
              <Link
                to={`/character/${planet.id}`}
                state={{ info: planet }}
              >
                {planet.name}
              </Link>
              <br />
            </div>
          );
        })}
    </>
  );
}
