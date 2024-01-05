import styles from './landing.module.css';
import { useNavigate } from 'react-router-dom';

export default function Landing() {

  const {h1, button, div, p} = styles;
  const navigate = useNavigate();
  return (
    <div className={div}>
<h1 className={h1}>Welcome to <p>Henry Videogames</p></h1>
<p className={p}>Haz click para ingresar</p>
<button className={button} onClick={() => {navigate('/home')}}></button>
    </div>
      
  );
}
