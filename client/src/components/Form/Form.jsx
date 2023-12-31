import { useDispatch, useSelector } from "react-redux";
import styles from "./form.module.css";
import { useState, useEffect } from "react";
import { loadGenres, createVideogame } from "../../redux/actions/actions";
import { useNavigate } from 'react-router-dom';

export default function Form() {
  const genres = useSelector((state) => state.allGenres);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { divPrinc, img, input, label, submit, checkbox, genreList, date } = styles;
  
  useEffect(() => {
    dispatch(loadGenres()); 
  }, [dispatch]);


  const [formData, setFormData] = useState({
    name: "",
    background_image: "",
    slug: "",
    platforms: [],
    released: "",
    rating: 0,
    genres: [],
  });

  const platforms = ["PC", "PlayStation 5", "PlayStation 4", "Xbox One", "Xbox Series S/X", "Nintendo Switch", "iOS", "Android", "Nintendo 3DS", "Nintendo DS", "Nintendo DSi", "macOS", "Linux", "Xbox 360", "Xbox", "PlayStation 3", "PlayStation 2", "PlayStation", "PS Vita", "PSP", "Wii U", "Wii", "GameCube", "Nintendo 64", "Game Boy Advance", "Game Boy Color", "Game Boy", "SNES", "NES", "Classic Macintosh", "Apple II", "Commodore / Amiga", "Atari 7800", "Atari 5200", "Atari 2600", "Atari Flashback", "Atari 8-bit", "Atari ST", "Atari Lynx", "Atari XEGS", "Genesis", "SEGA Saturn", "SEGA CD", "SEGA 32X", "SEGA Master System", "Dreamcast", "3DO", "Jaguar", "Game Gear", "Neo Geo"];

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
  
    if (name === "genres" || name === "platforms") {
      let arr = formData[name];
  
      if (checked) {
        arr = arr.concat(value);
      } else {
        arr = arr.filter((item) => item !== value);
      }
  
      setFormData({
        ...formData,
        [name]: arr,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const videogame = {
      name: formData.name,
      slug: formData.slug,
      background_image: formData.background_image,
      released: formData.released,
      rating: formData.rating,
      genres: formData.genres,
      platforms: formData.platforms,
      };

    dispatch(createVideogame(videogame));    
    navigate("/home");
  };

  return (
    <div className={divPrinc}>
      <form id="survey-form" onSubmit={handleSubmit}>
        <img
          className={img}
          src="https://pandaancha.mx/plds/articulos/froala/gaming-mexico-2022-videojuegos-siguen-creciendo-infografia-498x280-778742417.gif"
          alt=""
        ></img>
        <p></p><p></p>
        <label className={label}>Nombre:</label>
        <input className={input} value={formData.name} name="name" type="text"  onChange={handleInputChange} />
        <p></p>
        <label className={label}>Imagen:</label>
        <input className={input} value={formData.background_image} name="background_image" type="text"  onChange={handleInputChange} />
        <p></p>
        <label className={label}>Descripción:</label>
        <input className={input} value={formData.slug} name="slug" type="text"  onChange={handleInputChange} />
        <p></p>
        <label className={label}>Fecha de Lanzamiento:</label>
        <input type="date" value={formData.released} name="released" className={date}  onChange={handleInputChange} />
        <p></p>
        <label className={label}>Rating:</label>
        <input className={input} value={formData.rating} name="rating" type="text"  onChange={handleInputChange}/>
        <p></p>
        <label className={label}>Plataformas:</label>
        <div className={checkbox}>
  {platforms.map((platform) => (
    <div className={genreList} key={platform}>
      <input type="checkbox" value={platform} name="platforms" checked={formData.platforms.includes(platform)} onChange={handleInputChange} />
      <label className={genreList} htmlFor={platform}>{platform}</label>
    </div>
  ))}
</div>
        <p></p>
        <label htmlFor="genres" className={label}>Género/s:</label>
        <div className={checkbox}>
  {genres && genres.map((genre) => (
    <div className={genreList} key={genre.name}>
      <input type="checkbox" id={genre.name} value={genre.name} name="genres" checked={formData.genres.includes(genre.name)} onChange={handleInputChange} />
      <label className={genreList}  key={genre.id} htmlFor={genre.name} >{genre.name}</label>
    </div>
  ))}
</div>
        <p></p>
        <button className={submit} type="submit">
          Crear
        </button>
      </form>
    </div>
  );
}
