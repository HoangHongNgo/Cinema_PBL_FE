/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import axios from 'axios';
import ShowtimesDate from './../Date/Date';

export default function LichChieu() {

  const queryParams = new URLSearchParams(window.location.search);
  const cinemaId = queryParams.get("cinema");
  const [shows, setShows] = useState([]);
  console.log("cinema : ", cinemaId);
  useEffect(() => {
    // Lấy dữ liệu từ API bằng Axios
    axios.get(`https://cinema-00wj.onrender.com/shows/?cinema=${cinemaId}`)
      .then((response) => {
        setShows(response.data);
        console.log("show : ", response.data);
      })
      .catch((error) => {
        console.error('Lỗi khi lấy dữ liệu từ API:', error);
      });
  }, [cinemaId]);
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
              <p className="cinema_content">
                <a href="/rap/cinestar-quoc-thanh/" className="text-dark">
                  Cinestar Quốc Thanh
                </a>
                {"  "}·<span className="text-muted">Thứ Ba, 11/04/2023</span>
              </p>

              <p className="cinema_content">
                271 Nguyễn Trãi, P. Nguyễn Cư Trinh, Q.1, Tp. Hồ Chí Minh
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

            <div className="card-body">
              <div className="card_image">
                <a href="/phim/chuyen-toi-va-ma-quy-thanh-nguoi-mot-nha/">
                  <img
                    src="https://hcm01.vstorage.vngcloud.vn/v1/AUTH_0e0c1e7edc044168a7f510dc6edd223b/media-prd/cache/mini/6418044511034680650502.jpeg"
                    alt="Chuyện Tôi Và Ma Quỷ Thành Người Một Nhà"
                    className="rounded img-fluid"
                  />
                </a>
              </div>

              <div className="card_buyTicket">
                <h4 class="card-title mb-1 name">
                  <a href="/phim/chuyen-toi-va-ma-quy-thanh-nguoi-mot-nha/">
                    Chuyện Tôi Và Ma Quỷ Thành Người Một Nhà
                  </a>
                </h4>

                <p className="card_content">
                  Marry My Dead Body · NC18 · 2h10' ·
                  <a href="/video/17985/" className="trailer">
                    Trailer
                  </a>
                </p>

                <div>
                  <label className="small mb-2 font-weight-bold d-block text-dark ">
                    2D Phụ Đề Việt
                  </label>

                  <div className="card_price">
                    <a >
                      <span className="text-red-500">10:00</span>
                    </a>
                    <a>
                      <span>10:30</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
