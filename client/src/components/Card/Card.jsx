import React from "react";
import styles from "./card.module.css";
import { Link } from "react-router-dom";

export default function Card(props) {

  const {id, image, name, genres, rating} = props;
  const { h2, h2Rat, div, img, nameid } = styles;

  return (
    <div className={div}>
            <Link to={`/detail/${id}`}>
      <img className={img} src={image} alt="" />
        <h2 className={nameid}>{name}</h2>
      <h2 className={h2}>{genres}</h2>
      <h2 className={h2Rat}>{rating}</h2>
      </Link>
    </div>
  );
  }
