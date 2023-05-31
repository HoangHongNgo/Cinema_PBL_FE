import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import "./movie-list.scss";

import { SwiperSlide, Swiper } from "swiper/react";
import { Link } from "react-router-dom";

import Button from "../button/button";

import tmdbApi, { category } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

import MovieCard from "../movie-card/MovieCard";
import axios from "axios";

const MovieList = (props) => {
  const [items, setItems] = useState([]);
  const type= props.type;

  
  useEffect(() => {
    // Lấy dữ liệu từ API bằng Axios
    axios.get(`https://cinema-00wj.onrender.com/movies/`)
      .then((response) => {
        setItems(response.data.filter(movie => {
          return movie.status === type;
        }));
        console.log("Movie List : ", response.data);
      })
      .catch((error) => {
        console.error('Lỗi khi lấy dữ liệu từ API:', error);
      });
  }, []);

  return (
    <div className="movie-list">
      <Swiper grabCursor={true} spaceBetween={10} slidesPerView={"auto"}>
        {items.map((item, i) => (
          <SwiperSlide key={i}>
           
            <MovieCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
