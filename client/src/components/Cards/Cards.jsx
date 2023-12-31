import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import Loading from "../Loading/Loading";
import Nav from "../Nav/Nav";
import styles from "./cards.module.css";
import { loadVideogames, loadGenres, orderByName, orderByRating, filterByGenre, filterByOrigin } from "../../redux/actions/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Cards = () => {
  const { divFondo, order } = styles;
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.allVideogames);
  const genres = useSelector((state) => state.allGenres);
  const [input, setInput] = useState(1);
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

  const handleFilterG = (event) => {
    const genre = event.target.value;

    if(genre==="All Genres") {
      dispatch(filterByGenre(null));
    } else {
    dispatch(filterByGenre(genre));
  }
};

const handleFilterO = (event) => {
  const origin = event.target.value;

  if(origin==="All Origins") {
    dispatch(filterByOrigin(null));
  } else {
  dispatch(filterByOrigin(origin));
}
};


  return (
    <div>
      <Nav setPagina={setPagina} setInput={setInput} />
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
        <select className={order} onChange={handleFilterG}>
        <option value="" selected disabled>All Genres</option>
        {genres.map((genre) => (
          <option value={genre.name}>{genre.name}</option>
        ))}
      </select>
      <select className={order} onChange={handleFilterO}>
        <option value="">All origins</option>
        <option value="DataBase">DataBase</option>
        <option value="API">API</option>
      </select>
      </div>)}
      {loading ? (<Loading />) : (
        <div className={divFondo}>
          {videogames &&
            videogames.slice((pagina - 1) * porPagina, (pagina - 1) * porPagina + porPagina).map(({ id, name, background_image, genres, rating, source }, index) => {
                return (
                  <Card
                    key={id}
                    id={id}
                    name={name}
                    image={background_image}
                    genres={genres}
                    rating={rating}
                    source={source}
                  />
                );
              })}
        </div>
      )}
      {!loading && (
        <Pagination pagina={pagina} setPagina={setPagina} input={input} setInput={setInput} maximo={maximo} />
      )}
    </div>
  );
};

export default Cards;
