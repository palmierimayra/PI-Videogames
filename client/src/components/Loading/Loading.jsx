import React from "react";
import styles from './loading.module.css';

const Loading = () => {

  const {h2Loading, divLoading, imgLoading} = styles;

  return (
    <div className={divLoading}>
      <h2 className={h2Loading}>Loading...</h2>
      <img className={imgLoading} src="https://i.gifer.com/origin/76/76dfca2a58c4dff5c9827b527132bda8.gif" alt="Cargando" />
    </div>
  );
}

export default Loading;
