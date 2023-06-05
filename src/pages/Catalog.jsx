import React from "react";

import { useParams } from "react-router";

import PageHeader from "../components/page-header/PageHeader";

import MovieGrid from "../components/movie-grid/MovieGrid";

const Catalog = () => {
  const { status } = useParams();

  return (
    <>
      <PageHeader>
        {status == "1"
          ? "Phim đang chiếu"
          : status == "2"
          ? "Phim sắp chiếu"
          : "Tất cả các phim"}
      </PageHeader>
      <div className="container">
        <div className="section mb-3">
          <MovieGrid status={status} />
        </div>
      </div>
    </>
  );
};

export default Catalog;
