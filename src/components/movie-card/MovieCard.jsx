import React from "react";

import "./movie-card.scss";

import { Link } from "react-router-dom";

import Button from "../button/Button";

import { category } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

const MovieCard = (props) => {
  const item = props.item;

  // const link = "/" + category[props.category] + "/" + item.id;
  // const link = "/movies/" + item.id;

  return (
    <a href={"http://localhost:3000/detail/" + item.id}>
      <div>
        <div
          className="movie-card"
          style={{ backgroundImage: `url(${item.banner_image})` }}
        >
          <Button>
            <i className="bx bx-play"></i>
          </Button>
        </div>
        <h3 className="font-semibold">{item.name}</h3>
      </div>
    </a>
  );
};

export default MovieCard;
