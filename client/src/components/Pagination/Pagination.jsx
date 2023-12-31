import styles from "./pagination.module.css";

export default function Pagination ({pagina, setPagina, input, setInput, maximo}) {

    const {btn, divPr, pages, inputP} = styles;

    const previousPage = () => {
        if (pagina > 1) {
            setInput(input - 1);
            setPagina(pagina - 1);
        }
    }

    const nextPage = () => {
        if (pagina < Math.ceil(maximo)) {
            setInput(input + 1);
            setPagina(pagina + 1);
        }
    }

    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            const inputValue = parseInt(e.target.value);

            if (inputValue < 1) {
                setPagina(1);
                setInput(1);
            } else if (inputValue > Math.ceil(maximo)) {
                setPagina(Math.ceil(maximo));
                setInput(Math.ceil(maximo));
            } else if (!isNaN(inputValue)) {
                setPagina(inputValue);
                setInput(inputValue);
            } else if (isNaN(inputValue)) {
                alert("El caracter ingresado no es un número.");
                setPagina(1);
                setInput(1);
            }
        }
    };

    const onChange = (e) => {
        const inputValue = e.target.value;
        setInput(inputValue);
    };

    return (
        <div className={divPr}>
            <button className={btn} onClick={previousPage}>Anterior</button>
            <input className={inputP} onChange={onChange} onKeyDown={(e) => onKeyDown(e)} value={input}/>
            <span className={pages}>de {Math.ceil(maximo)}</span>
            <button className={btn} onClick={nextPage}>Siguiente</button>
        </div>
    );
};
