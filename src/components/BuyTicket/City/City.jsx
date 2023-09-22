/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  Select,
  MenuItem,
  InputLabel,
  makeStyles,
  Menu,
} from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles(() => ({
  select: {
    backgroundColor: "white",
    height: "40px",
  },
  menu: {
    maxHeight: "200px",
    overflowY: "auto",
  },
}));

export default function City() {
  const [cityList, setCityList] = useState([]);
  const queryParams = new URLSearchParams(window.location.search);
  const cityId = queryParams.get("city");
  let width = window.innerWidth;
  console.log("width : ", width);

  const classes = useStyles();
  const [city, setCity] = useState({
    id: 3,
    name: "Đà Nẵng",
  });
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("city", city.id);

    history.push({
      search: queryParams.toString(),
    });
  }, [city, location.search, history]);
  useEffect(() => {
    // Lấy dữ liệu từ API bằng Axios
    axios
      .get(`https://cinema-00wj.onrender.com/cinemas/cities/`)
      .then((response) => {
        setCityList(response.data);
        console.log("cities", response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
      });
  }, []);
  return (
    <>
      {width > 1024 ? (
        <div className="col-1">
          {/* <a href="#" className="list-group-item  list-group-region">
        Khu vực
      </a> */}
          <ul className="list-group">
            <li className="list-group-item  list-group-region">Khu vực</li>
            {cityList?.map((city) => (
              <li className="list-group-item  d-flex justify-content-between align-items-center btn-choose-region">
                <Link
                  to={`/buyticket/?city=${city.id}`}
                  className={`item ${city.id == cityId ? "focus" : ""}`}
                >
                  {city.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <>
          <InputLabel id="select-label">Thành phố</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            onChange={(e) => {
              console.log(city);
              setCity(cityList.find((item) => item.name == e.target.value));
            }}
            className={classes.select}
            MenuProps={{ classes: { paper: classes.menu } }}
            value={city.name}
          >
            {cityList?.map((item) => (
              <MenuItem value={item.name}>{item.name}</MenuItem>
            ))}
          </Select>
        </>
      )}
    </>
  );
}
