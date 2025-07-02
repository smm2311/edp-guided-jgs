import "./App.css";
// import { Characters, Character, Planet, Film, NavBar } from "./components";
import { Characters } from "./components/Characters";
import { Character } from "./components/Character";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      {/* <NavBar /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Characters />}></Route>
          <Route path="/character/:id" element={<Character />}></Route>
          {/* <Route path="/planet" element={<Planet />}></Route>
        <Route path="/film" element={<Film />}></Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
