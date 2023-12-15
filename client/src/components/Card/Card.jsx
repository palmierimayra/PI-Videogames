import React from "react";
import styles from "./card.module.css";
import { Link } from "react-router-dom";

export default function Card(props) {

  const {image, name, genres} = props;
  const { h2, div, img, nameid } = styles;

  return (
    <div className={div}>
            <Link to={`/detail/${name}`}>
      <img className={img} src={image} alt="" />
        <h2 className={nameid}>{name}</h2>
      <h2 className={h2}>{genres}</h2>
      </Link>
    </div>
  );
  }
