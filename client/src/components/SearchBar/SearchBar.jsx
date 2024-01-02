import styles from "./searchBar.module.css";
import { useState } from "react";
import { searchVideogame } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";

export default function SearchBar({setPagina, setInput}) {

  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const onSearch = () => {
    dispatch(searchVideogame(name));
    setInput(1);
    setPagina(1);
  };


  const onKeyDown = (event) => {
    if(event.keyCode === 13) { 
    onSearch()
    }};

  const { btn, input, divsch } = styles;

  return (
    <div className={divsch}>
      <input className={input} type="search" onChange={handleChange} onKeyDown={(e) => onKeyDown(e)}/>
      <button className={btn} onClick={onSearch}>Buscar</button>
    </div>
  );
};
