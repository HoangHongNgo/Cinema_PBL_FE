import React from "react";
import HeroSlide from "../components/hero-slide/HeroSlide";

import { Link } from "react-router-dom";
import { OutlineButton } from "../components/button/button";
import { category, movieType, tvType } from "../api/tmdbApi";
import MovieList from "../components/movie-list/MovieList";

const Home = () => {
  return (
    <>
      <HeroSlide />
      <div className="container">
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2 className="drop-shadow-md font-medium">Phim Sắp Chiếu</h2>
            <Link to="/2">
              <OutlineButton className="small">View More</OutlineButton>
            </Link>
          </div>
           <MovieList type={2}/>  
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2 className=" drop-shadow-md font-medium">Phim Đang Chiếu</h2>
            <Link to="/1">
              <OutlineButton className="small">View More</OutlineButton>
            </Link>
          </div>
          <MovieList type={1}/>
        </div>

        {/* <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Trending TV</h2>
            <Link to="/tv">
              <OutlineButton className="small">View More</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.popular} />
        </div> */}

        {/* <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top Rated TV</h2>
            <Link to="/tv">
              <OutlineButton className="small">View More</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.top_rated} />
        </div> */}
      </div>
    </>
  );
};
export default Home;
