import './App.css';
import Landing from "./components/Landing/Landing";
import Cards from './components/Cards/Cards';
import Detail from './components/Detail/Detail';
import Nav from './components/Nav/Nav';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from "react";

function App() {
  const [videogames, setVideogames] = useState([]);

  useEffect(() => {
    console.log("Updated videogames state:", videogames);
  }, [videogames]);

  return (
      <div className="App">
      <Nav />
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/home" element={<Cards />}></Route>
          <Route path="/detail/:id" element={<Detail />}></Route>
        </Routes>
      </div>
    );
}

export default App;