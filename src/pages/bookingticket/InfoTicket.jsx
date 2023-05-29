import React, { useState, useEffect, useContext } from "react";
import "./Bookingticket.scss";
import Ticket from "../../context/Ticket";
import "tailwindcss/tailwind.css";
import ListTicket from "../../context/ListTicket";
import axios from "axios";

const InfoTicket = (props) => {
  const [state, setState] = useContext(Ticket);
  const [list, setList] = useContext(ListTicket);
  useEffect(() => {
    console.log(list);
    list.forEach((element) => {
      axios
        .patch(
          `https://cinema-00wj.onrender.com/tickets/update/${element.id}/`,
          {
            owner: 1,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, []);
  return (
    <div className="rowticket ">
      <div className="col-lg-4 col-12">
        <div className="cardticket cardticket-sm">
          <div className="cardticket-body">
            <div className="rowticket">
              <div className="col-ticket">
                <p className="textticket text-truncate">Fast & Furious 10</p>
                <p className="textticket text-truncate">
                  <strong>Starlight Đà Nẵng</strong>
                </p>
                <p className="textticket text-truncate">
                  Suất
                  <strong className="marginticket-left">20:30</strong>- Hôm nay,
                  <strong> 22/05 </strong>
                </p>
                <p className="textticket text-truncate">
                  Phòng Chiếu
                  <strong className="marginticket-left"> 01 </strong>
                </p>
                <p className="textticket text-truncate">
                  Ghế
                  <strong className="marginticket-left">
                    <div className="row-wrapper">
                      {" "}
                      {list.map((seat) => (
                        <li key={seat.id} className="seat-row">
                          {seat.seat_row}
                          {seat.seat_num}
                        </li>
                      ))}{" "}
                    </div>
                  </strong>
                </p>
                <p className="textticket text-truncate">
                  Tong gia
                  <strong className="marginticket-left"> {state.price}d</strong>
                </p>
                <p className="textticket text-truncate">
                  Tinh trang
                  <strong className="marginticket-left"> Da thanh toan </strong>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div className="col-lg-8 col-12"></div>
    </div>
  );
};
export default InfoTicket;
