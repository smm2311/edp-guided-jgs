import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";

export function Film () {
    const location = useLocation();
    const {info} = location.state;

    //Creates a useState hook where setCharacters can alter characters's state
    const [characters, setCharacters] = useState([]);

    //Retrieves characters from a specific film id from the mongo database
    async function fetchCharacters() {
      try {
        const res = await fetch(
            //Info.id comes from the the Films component's return statement as a prop
          `${import.meta.env.VITE_API_URL_BASE}/films/${info.id}/characters`
        );
        if (!res.ok) {
          throw new Error("api messed up");
        }
        const res_json = await res.json();
        //setCharacters makes the characters variable's state to the result of this fetch
        setCharacters(res_json);
      } catch (err) {
        console.error(err);
      }
    }
  
    // Calls fetchCharacters when the page loads for the first time
    useEffect(() => {
      fetchCharacters();
    }, []);


    //Creates a useState hook where setPlanets can alter planets's state
    const [planets, setPlanets] = useState([]);

    //Retrieves planets from a specific film id from the mongo database
    async function fetchPlanets() {
      try {
        const res = await fetch(
            //Info.id comes from the the Films component's return statement as a prop
          `${import.meta.env.VITE_API_URL_BASE}/films/${info.id}/planets`
        );
        if (!res.ok) {
          throw new Error("api messed up");
        }
        const res_json = await res.json();
        //setPlanets makes the planets variable's state to the result of this fetch
        setPlanets(res_json);
      } catch (err) {
        console.error(err);
      }
    }
  
     // Calls fetchPlanets when the page loads for the first time
    useEffect(() => {
      fetchPlanets();
    }, []);

    
    return (
        <>
            <h1>{info.title}</h1>

            <h2>Properties</h2>
            
            {/* Info is a specific film object passed from the Films component, and this map function converts the specific film object's properties into paragraphs where
            each paragraph is a new key value pair of the film object  */}
            {Object.entries(info).map(([key, value]) => <p key={key}> {key.toUpperCase()}: {value}</p>)}

            <h2>Characters</h2>
            {/* Takes each character from characters and converts it to a link whose title is the character's name, and this link takes the user to the character's page,
            while passing the information of the character as a prop*/}
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
            {/* Takes each planet from planets and converts it to a link whose title is the planet's name, and this link takes the user to the planet's page,
            while passing the information of the planet as a prop*/}
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