import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";

export function Character() {
  const location = useLocation();
  const { info } = location.state;

  const [homeworld, setHomeworld] = useState({});
  const [films, setFilms] = useState([]);

  async function fetchHomeworld() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL_BASE}/planets/${info.homeworld}`
      );
      if (!res.ok) {
        throw new Error("api messed up");
      }
      const res_json = await res.json();
      setHomeworld(res_json);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchHomeworld();
  }, []);

  async function fetchFilms() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL_BASE}/characters/${info.id}/films`
      );
      if (!res.ok) {
        throw new Error("api messed up");
      }
      const res_json = await res.json();
      setFilms(res_json);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchFilms();
  }, []);

  return (
    <>
      <h1>{info.name}</h1>

      <h2>Properties</h2>
      {Object.entries(info).map(([key, value]) => (
        <p key={key}>
          {" "}
          {key.toUpperCase()}: {value}
        </p>
      ))}

      <h2>Homeworld</h2>
      <Link to={`/planet/${homeworld.id}`} state={{ info: homeworld }}>
        {homeworld.name}
      </Link>
      <h2>Films Appeared In</h2>
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
