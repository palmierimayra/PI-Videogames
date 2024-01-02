import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "../Detail/detail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { videogameById } from "../../redux/actions/actions";
import LoadingDetail from "../LoadingDetail/LoadingDetail";

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const videogame = useSelector((state) => state.videogameById);

  useEffect(() => {
    const getVideogameDetail = () => {
        dispatch(videogameById(id));
        setLoading(false);
    };
    getVideogameDetail();
  }, [dispatch, id]);


  const { divPrinc, title, datos, img, btn, divBtn } = styles;

  return (
    <div className={divPrinc}>
      {loading ? (
        <LoadingDetail />
      ) : (
        <>
          <div>
            <img className={img} src={videogame.background_image} alt={videogame.background_image} />
          </div>
          <div className={datos}>
            <h1 className={title}>{`${videogame.id} - ${videogame.name}`}</h1>
            <h2>SLUG | {videogame.slug}</h2>
            <h2>GENRES | {videogame.genres}</h2>
            <h2>PLATFORMS | {videogame.platforms}</h2>
            <h2>RELEASED | {videogame.released}</h2>
            <h2>RATING | {videogame.rating}</h2>
            <p></p>
          </div>
          <div className={divBtn}><Link to="/home">
              <button className={btn} type="submit">Volver a Home</button>
            </Link>
            </div>
        </>
      )}
    </div>
  );
}