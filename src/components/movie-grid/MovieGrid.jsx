import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router";

import "./movie-grid.scss";

import MovieCard from "../movie-card/MovieCard";
import Button from "../button/Button";
import Input from "../input/InputBase";

import axios from "axios";

const MovieGrid = (props) => {
  const [items, setItems] = useState([]);

  const { keyword } = useParams();

  useEffect(() => {
    console.log("status : ", props.status);
    axios
      .get(`https://cinema-00wj.onrender.com/movies/`)
      .then((response) => {
        setItems(
          response.data.filter((movie) => {
            if (props.status != 3) return movie.status == props.status;
            else return true;
          })
        );
        console.log("Movie List : ", items, "status", props.status);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
      });
  }, [props.status]);

  useEffect(() => {
    if (keyword) {
      let keywords = keyword.split("+");
      console.log("keywords[1] : ", keywords[1]);
      axios
        .get(
          `https://cinema-00wj.onrender.com/movies/search${
            keywords[0] == "rdf" ? "_rdf" : ""
          }/?search=${keywords[1]}`
        )
        .then((response) => {
          setItems(response.data);
          console.log("Movie List : ", response, "status", props.status);
        })
        .catch((error) => {
          console.error("Lỗi khi lấy dữ liệu từ API:", error);
        });
    }
  }, [keyword]);

  return (
    <>
      <div className="section mb-8">
        <MovieSearch status={props.status} keyword={keyword} />
      </div>
      <div className="movie-grid">
        {items.map((item, i) => (
          <MovieCard item={item} key={i} />
        ))}
      </div>
    </>
  );
};

const MovieSearch = (props) => {
  const history = useHistory();

  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");
  const [isRDF, setIsRDF] = useState(false);

  const goToSearchNor = async () => {
    await setIsRDF(false);
    goToSearch();
  };

  const goToSearchRdf = async () => {
    await setIsRDF(true);
    goToSearch();
  };

  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      history.push(
        `/category/${props.status}/search/${isRDF ? "rdf" : "nor"}+${keyword}`
      );
    }
  }, [keyword, props.status, history, isRDF]);

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      }
    };
    document.addEventListener("keyup", enterEvent);
    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [keyword, goToSearch, isRDF]);

  return (
    <div className="movie-search">
      <div className="inline">
        <Input
          type="text"
          placeholder="Nhập từ khóa"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      <div className="inline mx-4">
        <Button className="small" onClick={goToSearchNor}>
          Tìm kiếm
        </Button>
      </div>
      <div className="inline">
        <Button className="small" onClick={goToSearchRdf}>
          Tìm kiếm RDF
        </Button>
      </div>
    </div>
  );
};

export default MovieGrid;
