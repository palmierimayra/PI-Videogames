import styles from "./pagination.module.css";
import { useState } from 'react';

export default function Pagination ({pagina, setPagina, maximo}) {

    const {btn, divPr, pages, inputP} = styles;
    const [input, setInput] = useState(1);
    
    const previousPage = () => {
        setInput(input - 1);
        setPagina(pagina - 1);
    }

    const nextPage = () => {
        setInput(input + 1);
        setPagina(pagina + 1);
    }

    const onKeyDown = (e) => {
        if(e.keyCode === 13) {
            setPagina(parseInt(e.target.value))
            if(parseInt(e.target.value)<1 || parseInt(e.target.value)>Math.ceil(maximo) || isNaN(parseInt(e.target.value))) {
                setPagina(1);
                setInput(1);
            } else {
                setPagina(parseInt(e.target.value))
            }
        }
    };

    const onChange = (e) => {
        setInput(e.target.value);
    };

return (
    <div className={divPr}>
        <button className={btn} onClick={previousPage}>Anterior</button>
        <input className={inputP} onChange={onChange} onKeyDown={(e) => {onKeyDown(e)}} value={input}/>
        <span className={pages}>de {Math.ceil(maximo)}</span>
        <button className={btn} onClick={nextPage}>Siguiente</button>
    </div>
)
};
