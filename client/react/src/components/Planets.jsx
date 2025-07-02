import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function Planets() {
  const [planets, setPlanets] = useState([]);

  async function fetchPlanets() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL_BASE}/planets`
      );
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
