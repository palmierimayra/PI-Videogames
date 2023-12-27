import SearchBar from "../SearchBar/SearchBar";
import styled from "./nav.module.css";
import { NavLink, useLocation } from "react-router-dom";

export default function Nav(props) {
  const location = useLocation();

  if (location.pathname === "/") {
    return null;
  }

  const { onSearch } = props;

  const { div, btn } = styled;

  return (
    <div className={div}>
      <nav>
        <NavLink to="/">
          <button className={btn}>Landing</button>
        </NavLink>
        <NavLink to="/home">
          <button className={btn}>Home</button>
        </NavLink>
        <NavLink to="/form">
          <button className={btn}>Formulario</button>
        </NavLink>
        <SearchBar onSearch={onSearch} />
      </nav>
    </div>
  );
}