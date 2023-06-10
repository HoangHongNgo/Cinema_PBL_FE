import React, { useEffect, useState,useLocation} from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */

export default function Cinema() {
  const [cinemas, setCinemas] = useState([]);
  const queryParams = new URLSearchParams(window.location.search);
  const cityId = queryParams.get("city");
  const cinemaId = queryParams.get("cinema");

 
  console.log("city ID", cityId);
  useEffect(() => {
  // Lấy dữ liệu từ API bằng Axios
  axios.get(`https://cinema-00wj.onrender.com/cinemas/cinema/?city=${cityId ? cityId : 1}`)
    .then((response) => {
      setCinemas(response.data);
      console.log("cinemas", response.data);
    })
    .catch((error) => {
      console.error('Lỗi khi lấy dữ liệu từ API:', error);
    });
}, [cityId]);
  return (
    <div className="col-1 w-1/4 md:w-auto">
      <ul className="list-group">
        {cinemas.map((cinema_brand) =>(
          <div>
          <li className="list-group-item list-group-region list-cinema-item">
          <a
            href="#"
            className="list-group-item list-group-item-action disabled bg-light"
          >
            <img
              src={cinema_brand.logo_path}
              alt
              className="rounded-circle float-left mr-3"
              width={24}
            />
          </a>
          <span>{cinema_brand.name}</span>
          </li>
          {cinema_brand.cinemas.map((cinema) =>(
            <li className="list-group-item ">
              <Link to={`/buyticket/?city=${cityId}&cinema=${cinema.id}`} className={`list-group-item item ${cinema.id==cinemaId ? "focus" : ""} `} data-cinema={118366}>
                {cinema.name}
              </Link>
            </li>
          ))}
          </div>
        ))}
      </ul>
    </div>
  );
}
