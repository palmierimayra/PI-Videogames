import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "../Detail/detail.module.css";
import { Link } from "react-router-dom";

export default function Detail() {
  const { id } = useParams();
  const [videogame, setVideogame] = useState({});

  useEffect(() => {
    axios(`http://localhost:3001/videogames/${id}`).then(
      ({ data }) => {
        console.log("API response:", data);
        
        const gameData = {
          id: data.id,
          name: data.name,
          slug: data.slug,
          genres: data.genres,
          platforms: data.platforms,
          background_image: data.background_image,
          released: data.released,
          rating: data.rating,
        };
        setVideogame(gameData);
      }
    );
  }, [id]);

  const { divPrinc, title, datos, img, btn } = styles;

  return (
    <div className={divPrinc}>
      {videogame.name ? (
        <>
          <div>
            <img className={img} src={videogame.background_image} alt={videogame.background_image} />
          </div>
          <div className={datos}>
            <h1 className={title}>{videogame.id} - {videogame.name.toUpperCase()}</h1>
            <h2>SLUG | {videogame.slug}</h2>
            <h2>GENRES | {videogame.genres}</h2>
            <h2>PLATFORMS | {videogame.platforms}</h2>
            <h2>RELEASED | {videogame.released}</h2>
            <h2>RATING | {videogame.rating}</h2>
            <p></p>
            <Link to="/home">
          <button className={btn} type="submit">Volver</button>
      </Link>
          </div>
        </>
      ) : (
        <p>Cargando pagina...</p>
      )}
    </div>
  );
}
