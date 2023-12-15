import './App.css';
import Landing from "./components/Landing/Landing";
import Cards from './components/Cards/Cards';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/home" element={<Cards />}></Route>
        </Routes>
      </div>
    );
}

export default App;