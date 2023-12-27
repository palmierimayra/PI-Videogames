import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import Loading from "../Loading/Loading";
import styles from "./cards.module.css";
import { loadVideogames, loadGenres, orderByName, orderByRating, filterByGenre } from "../../redux/actions/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Cards = () => {
  const { divFondo, order } = styles;
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.allVideogames);
  const genres = useSelector((state) => state.allGenres);
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(15);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    dispatch(loadVideogames()).then(() => {
      setLoading(false);
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadGenres()); 
  }, [dispatch]);

  const maximo = Math.ceil(videogames.length / porPagina);

  const handleOrderR = (event) => {
    const order = event.target.value;
    dispatch(orderByRating(order));
  };

  const handleOrderN = (event) => {
    const order = event.target.value;
    dispatch(orderByName(order));
  };

  const handleFilter = (event) => {
    const genre = event.target.value;

    if(genre==="All Genres") {
      dispatch(filterByGenre(null));
    } else {
    dispatch(filterByGenre(genre));
  }
};

  return (
    <div>
            {!loading && (
      <div>
        <select className={order} onChange={handleOrderR}>
          <option value="" selected disabled>Order By Rating</option>
          <option value="A">Ascendent</option>
          <option value="D">Descendent</option>
        </select>
        <select className={order} onChange={handleOrderN}>
          <option value="" selected disabled>Order By Name</option>
          <option value="A">Ascendent</option>
          <option value="D">Descendent</option>
        </select>
        <select className={order} onChange={handleFilter}>
        <option defaultValue>All Genres</option>
        {genres.map((genre) => (
          <option value={genre.name}>{genre.name}</option>
        ))}
      </select>
      <select className={order} onChange={handleFilter}>
        <option value="">All origins</option>
        <option value="DB">Database</option>
        <option value="API">Api</option>
      </select>
      </div>)}
      {loading ? (<Loading />) : (
        <div className={divFondo}>
          {videogames &&
            videogames.slice((pagina - 1) * porPagina, (pagina - 1) * porPagina + porPagina).map(({ id, name, background_image, genres, rating }, index) => {
                return (
                  <Card
                    key={id}
                    id={id}
                    name={name}
                    image={background_image}
                    genres={genres}
                    rating={rating}
                  />
                );
              })}
        </div>
      )}
      {!loading && (
        <Pagination pagina={pagina} setPagina={setPagina} maximo={maximo} />
      )}
    </div>
  );
};

export default Cards;
