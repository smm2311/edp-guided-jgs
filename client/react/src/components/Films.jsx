import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search } from "./Search";

export function Films() {
  const [films, setFilms] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  async function fetchFilms() {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL_BASE}/films`);
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
      <Search
        topic="Search Films"
        dataNames={films.map((c) => c.title)}
        setSearchResults={setSearchResults}
      />
      {searchResults.length === 0
        ? films.map((film) => (
            <div key={film.id}>
              <Link to={`/film/${film.id}`} state={{ info: film }}>
                {film.title}
              </Link>
              <br />
            </div>
          ))
        : searchResults.map((name) => {
            const film = films.find((c) => c.title === name);
            return (
              <div key={film.title}>
                <Link to={`/film/${film.id}`} state={{ info: film }}>
                  {film.title}
                </Link>
                <br />
              </div>
            );
          })}
    </>
  );
}
