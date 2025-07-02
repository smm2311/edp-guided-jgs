import "./App.css";
import { Characters } from "./components/Characters";
import { Character } from "./components/Character";
import { Films } from "./components/Films";
import { Film } from "./components/Film";
import { Planets } from "./components/Planets";
import { Planet } from "./components/Planet";
import { NavBar } from "./components/NavBar";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Characters />}></Route>
          <Route path="/characters" element={<Characters />}></Route>
          <Route path="/character/:id" element={<Character />}></Route>
          <Route path="/films" element={ <Films />}></Route>
          <Route path="/film/:id" element={<Film />}></Route>
          <Route path="/planets" element={<Planets />}></Route>
          <Route path="/planet/:id" element={<Planet />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
