import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";

export function Planet () {
    const location = useLocation();
    const {info} = location.state;

    const [characters, setCharacters] = useState([]);

    async function fetchCharacters() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL_BASE}/planets/${info.id}/characters`
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

    const [films, setFilms] = useState([]);

    async function fetchFilms() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL_BASE}/planets/${info.id}/films`
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
            {Object.entries(info).map(([key, value]) => <p key={key}> {key.toUpperCase()}: {value}</p>)}

            <h2>Characters</h2>
            {characters.map((character) => (
                <div key={character.id}>
                    <Link to={`/character/${character.id}`} state={{ info: character }}>
                        {character.name}
                    </Link>
                    <br />
                </div>
                ))
            }

            <h2>Films</h2>
            {films.map((film) => (
                <div key={film.id}>
                    <Link to={`/film/${film.id}`} state={{ info: film }}>
                        {film.title}
                    </Link>
                    <br />
                </div>
                ))
            }
        </>
    )
}