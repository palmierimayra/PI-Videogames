import './App.css';
import Landing from "./components/Landing/Landing";
import Cards from './components/Cards/Cards';
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/home" element={<Cards />}></Route>
          <Route path="/detail/:id" element={<Detail />}></Route>
          <Route path="/form" element={<Form />}></Route>
        </Routes>
      </div>
    );
}

export default App;