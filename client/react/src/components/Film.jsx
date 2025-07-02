import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";

export function Film () {
    const location = useLocation();
    const {info} = location.state;

    const [characters, setCharacters] = useState([]);

    async function fetchCharacters() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL_BASE}/films/${info.id}/characters`
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

    const [planets, setPlanets] = useState([]);

    async function fetchPlanets() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL_BASE}/films/${info.id}/planets`
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

            <h2>Planets</h2>
            {planets.map((planet) => (
                <div key={planet.id}>
                    <Link to={`/planet/${planet.id}`} state={{ info: planet }}>
                        {planet.name}
                    </Link>
                    <br />
                </div>
                ))
            }
        </>
    )
}