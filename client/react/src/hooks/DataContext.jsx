import {createContext, useContext, useState, useEffect} from 'react';

const DataContext = createContext(null);

export const DataProvider = ({children}) => {

    const [characters, setCharacters] = useState([]);
    const [planets, setPlanets] = useState([]);
    const [films, setFilms] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL_BASE}/characters`)
        .then(res => res.json())
        .then(res => setCharacters(res));

        fetch(`${import.meta.env.VITE_API_URL_BASE}/planets`)
        .then(res => res.json())
        .then(res => setPlanets(res));

        fetch(`${import.meta.env.VITE_API_URL_BASE}/films`)
        .then(res => res.json())
        .then(res => setFilms(res));
    })

    return (
        <DataContext.Provider value={{characters, planets, films}}>{children}</DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);