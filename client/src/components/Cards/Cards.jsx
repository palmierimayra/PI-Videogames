import Card from "../Card/Card";
import styles from "./cards.module.css";
import { loadVideogames } from "../../redux/actions/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; 

const Cards = () => {
  const { divFondo } = styles;
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.allVideogames);
  
  useEffect(() => {
    dispatch(loadVideogames()); 
  }, [dispatch]);

  console.log("Videogames:", videogames); 

  return (
    <div>
      <div className={divFondo}>
        {videogames && videogames.map(({ id, name, background_image, genres }, index) => {

          return (
            <Card
              key={id}
              name={name}
              image={background_image}
              genres={genres}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Cards;
