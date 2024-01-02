import { useDispatch, useSelector } from "react-redux";
import styles from "./form.module.css";
import { useState, useEffect } from "react";
import { loadGenres, createVideogame } from "../../redux/actions/actions";
import { useNavigate, Link } from 'react-router-dom';

export default function Form() {
  const genres = useSelector((state) => state.allGenres);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { divPrinc, img, input, label, submit, checkbox, genreList, date, error, divBtn } = styles;
  
  useEffect(() => {
    dispatch(loadGenres()); 
  }, [dispatch]);

const [errors, setErrors] = useState({
  name: "",
  background_image: "",
  slug: "",
  platforms: "",
  released: "",
  rating: "",
  genres: "",
})
  const [formData, setFormData] = useState({
    name: "",
    background_image: "",
    slug: "",
    platforms: [],
    released: "",
    rating: "",
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

    if (formData.name.length < 3 || formData.name.length > 20) {
      return setErrors({...errors, name: 'El nombre debe contener entre 3 y 20 caracteres'});    
  }  else if (formData.slug === '') {
      return setErrors({ ...errors,  slug:'El campo descripción no puede ser nulo' });
  } else if (formData.released === '') {
      return setErrors({ ...errors,  released: 'El campo fecha de lanzamiento no puede ser nulo' });
  } else if (formData.rating < 0 || formData.rating > 10 ) {
      return setErrors({ ...errors,  rating:'El rating debe tener un valor entre 0 y 10' });
  }  else if(formData.platforms.length === 0 || formData.platforms.length > 5 ){
      return setErrors({ ...errors, platforms:'Debe seleccionar al menos una plataforma (Máximo: 5)'});
  } else if(formData.genres.length === 0 || formData.genres.length > 5 ){
      return setErrors({ ...errors,  genres:'Debe seleccionar al menos un género (Máximo: 5)'});
   } else if(formData.background_image && !/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|png|gif)/g.test(formData.background_image)){
        return setErrors({ ...errors,  background_image:'Debe seleccionar una imagen válida'});
  } else {
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
    e.target.reset();
    alert("Videojuego creado de manera exitosa");
    navigate("/home");
  }};

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
        <p className={error}>{errors.name}</p>
        <p></p>
        <label className={label}>Imagen:</label>
        <input className={input} value={formData.background_image} name="background_image" type="text"  onChange={handleInputChange} />
        <p className={error}>{errors.background_image}</p> 
        <p></p>
        <label className={label}>Descripción:</label>
        <input className={input} value={formData.slug} name="slug" type="text"  onChange={handleInputChange} />
        <p className={error}>{errors.slug}</p>
        <p></p>
        <label className={label}>Fecha de Lanzamiento:</label>
        <input type="date" value={formData.released} name="released" className={date}  onChange={handleInputChange} />
        <p className={error}>{errors.released}</p>
        <p></p>
        <label className={label}>Rating:</label>
        <input className={input} value={formData.rating} name="rating" type="text"  onChange={handleInputChange}/>
        <p className={error}>{errors.rating}</p>
        <p></p>
        <label className={label}>Plataformas:</label>
        <p className={error}>{errors.platforms}</p>
        <div className={checkbox}>
  {platforms.sort().map((platform) => (
    <div className={genreList} key={platform}>
      <input type="checkbox" value={platform} name="platforms" checked={formData.platforms.includes(platform)} onChange={handleInputChange} />
      <label className={genreList} htmlFor={platform}>{platform}</label>
    </div>
  ))}
</div>
        <p></p>
        <label htmlFor="genres" className={label}>Género/s:</label>
        <p className={error}>{errors.genres}</p>
        <div className={checkbox}>
  {genres && genres.sort().map((genre) => (
    <div className={genreList} key={genre.name}>
      <input type="checkbox" id={genre.name} value={genre.name} name="genres" checked={formData.genres.includes(genre.name)} onChange={handleInputChange} />
      <label className={genreList}  key={genre.id} htmlFor={genre.name} >{genre.name}</label>
    </div>
  ))}
</div>
        <p></p>
        <div className={divBtn}>
        <button className={submit} type="submit">Crear</button>
        <Link to="/home">
              <button className={submit} type="submit">Volver a Home</button>
        </Link>
        </div>
      </form>
    </div>
  );
}
