/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

export default function City() {
  const [cityList, setCityList] = useState([])
  const queryParams = new URLSearchParams(window.location.search);
  const cityId = queryParams.get("city");
  useEffect(() => {
    // Lấy dữ liệu từ API bằng Axios
    axios.get(`https://cinema-00wj.onrender.com/cinemas/cities/`)
      .then((response) => {
        setCityList(response.data);
        console.log("cities", response.data);
      })
      .catch((error) => {
        console.error('Lỗi khi lấy dữ liệu từ API:', error);
      });
  }, []);
  return (
    <div className="col-1">
      {/* <a href="#" className="list-group-item  list-group-region">
        Khu vực
      </a> */}
      <ul className="list-group">
        <li className="list-group-item  list-group-region">Khu vực</li>
        {cityList?.map((city) => (
          <li className="list-group-item  d-flex justify-content-between align-items-center btn-choose-region">
            <Link to={`/buyticket/?city=${city.id}`} className={`item ${city.id ==cityId ? "focus" : "" }`}> 
              {city.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
