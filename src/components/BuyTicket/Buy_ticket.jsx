/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Buy_ticket.scss";
import City from "./City/City";
import Cinema from "./Cinema/Cinema";
import LichChieu from "./LichChieu/LichChieu";
import { AppProvider } from "../../contexts/app.context";
import { useState, createContext } from "react";

export default function Buy_ticket() {
  const [state, setState] = useState({});

  return (
    <div className="container buyticket md:p-16 md:flex md:flex-col xl:p-32 xl:grid">
      <AppProvider>
        <City />
        <Cinema />
        <LichChieu />
      </AppProvider>
    </div>
  );
}
