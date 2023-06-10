import React, { useState, useEffect } from "react";
import PageHeader from "../../components/page-header/PageHeader";
import axios from "axios";
import QRCode from "react-qr-code";
import { useHistory } from "react-router-dom";
import "./history.scss";
import Modal from "../../components/modal_base/Modal";

const History = () => {
  const [ticketowner, setTicketOwner] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleQRCodeClick = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
    console.log(ticket);
    console.log("Open modal");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  let userid = localStorage.getItem("userID");
  let history = useHistory();

  useEffect(() => {
    if (!userid) {
      alert("Bạn cần đăng nhập");
      history.push("/");
    } else {
      axios
        .get(`https://cinema-00wj.onrender.com/tickets/list/${userid}/`)
        .then((response) => {
          setTicketOwner(response.data);
          console.log("payment : ", response.data);
        })
        .catch((error) => {
          console.error("Lỗi khi lấy dữ liệu từ API:", error);
        });
    }
  }, [userid]);

  console.log("history");
  return (
    <div>
      <PageHeader></PageHeader>
      <div className="flex flex-row justify-between">
        <div className="w-1/2 mx-auto md:w-3/4">
          <div className="uppercase font-extrabold text-2xl hover:scale-110 transition-transform duration-300 hover:text-red-500 flex-col text-center ">
            Vé đã mua
          </div>
          <div className="history-list overflow-auto">
            {ticketowner?.map((ticket) => (
              <div className="bg-neutral-800 hover:bg-neutral-700 rounded-xl flex flex-nowrap md:justify-around my-6 p-3 h-fit">
                <div className="h-24 md:h-12 my-auto xl:mx-12">
                  <QRCode
                    className="h-full w-full"
                    value={
                      "Payment ID: " + ticket.id + " User ID:" + ticket.owner
                    }
                    onClick={() => handleQRCodeClick(ticket)}
                  ></QRCode>
                </div>
                <div className="">
                  <h4 className="text-red-700 uppercase font-bold ">
                    {ticket.tickets[0]?.showtime.movie.name}
                  </h4>
                  <div className="text-white">
                    {" "}
                    {ticket.tickets[0]?.showtime.Cinema_Room.name} -{" "}
                    {ticket.tickets[0]?.showtime.Cinema_Room.cinema.name}{" "}
                  </div>
                  <span>Ghế :</span>
                  <p>
                    {ticket.tickets.map((ticket) => {
                      return ticket.seat_row + ticket.seat_num + " ";
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedTicket && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <QRCode
            className="h-full w-full"
            value={
              "Payment ID: " +
              selectedTicket.id +
              " User ID:" +
              selectedTicket.owner
            }
          ></QRCode>
        </Modal>
      )}
    </div>
  );
};

export default History;
