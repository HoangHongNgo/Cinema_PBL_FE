import React, { useState, useEffect, useContext } from "react";
import "./Bookingticket.scss";
import Ticket from "../../context/Ticket";
import "tailwindcss/tailwind.css";
import ListTicket from "../../context/ListTicket";
import QRCode from "react-qr-code";
import axios from "axios";

const InfoTicket = (props) => {
  const [state, setState] = useContext(Ticket);
  const [list, setList] = useContext(ListTicket);
  const [tickets, setTickets] = useState([]);
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
          setTickets((prev) => {
            return [...prev, res.data];
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
    console.log(tickets);
  }, []);
  return (
    <div className="w-3/4 mx-auto">
      <div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-1/6 mx-auto text-green-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div>
          <p className="text-center text-green-500 text-xl">
            Đặt vé thành công
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-9">
        <div className="bg-white rounded-xl opacity-80">
          <QRCode className="w-2/3 h-full m-auto" value="21314354354"></QRCode>
        </div>
        <div className="col-span-2 bg-white rounded-xl opacity-80">
          <table className="table rounded-xl overflow-hidden">
            <thead>
              <tr>
                <th>Mô tả</th>
                <th className="text-right">Thông tin</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tên phim</td>
                <td className="text-right">{}</td>
              </tr>
              <tr>
                <td>Mã ghế</td>
                <td className="text-right overflow-visible">
                  {list.map((seat, index) => (
                    <div key={seat.id} className="seat-row inline-block">
                      {seat.seat_row}
                      {seat.seat_num}
                      {index < list.length - 1 ? "," : ""}
                    </div>
                  ))}
                </td>
              </tr>

              <tr>
                <td>Tổng</td>
                <td className="text-right">
                  {parseInt(state.price) + 3.0}.000 đ
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    // <div className="rowticket flex justify-center">
    //   <div className="col-lg-4 col-12">
    //     <div className="cardticket cardticket-sm">
    //       <div className="cardticket-body">
    //         <div className="rowticket">
    //           <div className="col-ticket">
    //             <p className="textticket text-truncate">Fast & Furious 10</p>
    //             <p className="textticket text-truncate">
    //               <strong>Starlight Đà Nẵng</strong>
    //             </p>
    //             <p className="textticket text-truncate">
    //               Suất
    //               <strong className="marginticket-left">20:30</strong>- Hôm nay,
    //               <strong> 22/05 </strong>
    //             </p>
    //             <p className="textticket text-truncate">
    //               Phòng Chiếu
    //               <strong className="marginticket-left"> 01 </strong>
    //             </p>
    //             <p className="textticket text-truncate">
    //               Ghế
    //               <strong className="marginticket-left">
    //                 <div className="row-wrapper">
    //                   {" "}
    //                   {list.map((seat) => (
    //                     <li key={seat.id} className="seat-row">
    //                       {seat.seat_row}
    //                       {seat.seat_num}
    //                     </li>
    //                   ))}{" "}
    //                 </div>
    //               </strong>
    //             </p>
    //             <p className="textticket text-truncate">
    //               Tổng giá :
    //               <strong className="marginticket-left"> {state.price}d</strong>
    //             </p>
    //             <p className="textticket text-truncate">
    //               Tình trạng :
    //               <strong className="marginticket-left"> Đã thanh toán </strong>
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div></div>
    //   </div>
    // </div>
  );
};
export default InfoTicket;
