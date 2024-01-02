import React from "react";
import styles from './loadingDetail.module.css';

const LoadingDetail = () => {

  const {h2Loading, divLoading, imgLoading} = styles;

  return (
    <div className={divLoading}>
      <h2 className={h2Loading}>Loading...</h2>
      <img className={imgLoading} src="https://i.pinimg.com/originals/bc/cf/e7/bccfe7b976f2a4afb77fdc2f2e5a6bd9.gif" alt="Cargando" />
    </div>
  );
}

export default LoadingDetail;
