/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import axios from "axios";
import ShowtimesDate from "./../Date/Date";
import { Link } from "react-router-dom";

export default function LichChieu() {
  const queryParams = new URLSearchParams(window.location.search);
  const cinemaId = queryParams.get("cinema");
  const date = queryParams.get("date");
  const movie = queryParams.get("movie");
  const [shows, setShows] = useState([]);
  const [cinema, setCinema] = useState({});
  console.log("cinema_id : ", cinemaId);
  console.log("date : ", date);
  console.log("movie : ", movie);
  useEffect(() => {
    // Lấy dữ liệu từ API bằng Axios
    axios
      .get(
        `https://cinema-00wj.onrender.com/shows/?cinema=${cinemaId}&date=${date}${
          movie ? `&movie=${movie}` : ""
        }`
      )
      .then((response) => {
        setShows(response.data);
        console.log("show : ", response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
      });
  }, [cinemaId, date]);
  useEffect(() => {
    // Lấy dữ liệu từ API bằng Axios
    axios
      .get(`https://cinema-00wj.onrender.com/cinemas/cinema/${cinemaId}/`)
      .then((response) => {
        setCinema(response.data);
        console.log("cinema : ", response.data);
      })
      .catch((error) => {
        console.error(
          "Lỗi khi lấy dữ liệu từ API:",
          `https://cinema-00wj.onrender.com/cinemas/cinema/${cinemaId}`,
          error
        );
      });
  }, [cinemaId]);

  const shows_by_movie = shows.reduce((acc, show) => {
    const movieId = show.movie.id;
    const movie = acc.find((m) => m.id === movieId);

    if (movie) {
      movie.shows.push(show);
    } else {
      acc.push({
        id: movieId,
        movie: show.movie,
        shows: [show],
      });
    }
    return acc;
  }, []);

  console.log("shows_by_movie : ", shows_by_movie);
  return (
    <>
      <div className="col-2">
        <div id="showtimes">
          <ShowtimesDate />

          <div className="alert">
            <i className="alert_icon">ℹ️</i>
            <span> Nhấn vào suất chiếu để tiến hành mua vé</span>
          </div>

          <div className="cinema_inf">
            <p className="cinema_content mx-3">
              <a href="/rap/cinestar-quoc-thanh/" className="text-dark">
                {cinema.name}
              </a>
            </p>

            <p className="cinema_content mx-3">
              {cinema.address}
              {"  "}-{"  "}
              <a
                href="https://maps.google.com/?q=Cinestar Quốc Thanh"
                target="_blank"
                className="cinema_content_direction"
                rel="noreferrer"
              >
                Bản đồ
              </a>
              {"  "}-{"  "}
              <a
                href="#"
                data-toggle="modal"
                data-target="#ticketModal"
                data-ticket-image="https://hcm01.vstorage.vngcloud.vn/v1/AUTH_0e0c1e7edc044168a7f510dc6edd223b/media-prd/cache/full/5c8723dc1bc51547219229.jpg"
                className="cinema_content_direction"
              >
                Giá vé
              </a>
            </p>
          </div>

          {shows_by_movie.map((movie) => (
            <div className="card-body">
              <div className="card_image">
                <a href="/phim/chuyen-toi-va-ma-quy-thanh-nguoi-mot-nha/">
                  <img
                    src={movie.movie.cover_image}
                    alt=""
                    className="rounded img-fluid"
                  />
                </a>
              </div>

              <div className="card_buyTicket">
                <h4 class="card-title mb-1 name">
                  <a href="">{movie.movie.name}</a>
                </h4>

                <p className="card_content">
                  {movie.movie.tags.map((tag) => (
                    <p className="inline">{tag.name} · </p>
                  ))}
                  NC {movie.movie.age_limit} · {movie.movie.duration_minute}' ·{" "}
                  <a href="/video/17985/" className="trailer">
                    Trailer
                  </a>
                </p>

                <div>
                  <label className="small mb-2 font-weight-bold d-block text-dark ">
                    2D Phụ Đề Việt
                  </label>

                  <div className="card_price">
                    {movie.shows
                      .sort(
                        (a, b) =>
                          new Date(a.start_time) - new Date(b.start_time)
                      )
                      .map((show) => (
                        <Link to={`/booking/${show.id}`}>
                          <a
                            // href={`/booking/${show.id}`}
                            className="btn-showtime m-1"
                          >
                            <span className="m-auto">
                              {show?.start_time.substr(11, 5)}
                            </span>
                          </a>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
