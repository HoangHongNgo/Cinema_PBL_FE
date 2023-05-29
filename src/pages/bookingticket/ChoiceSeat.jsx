import React, { useState, useEffect, useContext } from "react";
import "./Bookingticket.scss";
import Ticket from "../../context/Ticket";
import "tailwindcss/tailwind.css";
import ListTicket from "../../context/ListTicket";

const ChoiceSeat = (props) => {
  const seats = props.seats;
  const show = props.show;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [groupedSeats, setGroupedSeats] = useState({});
  const [state, setState] = useContext(Ticket);
  const [list, setList] = useContext(ListTicket);

  const handleSeatClick = (seat) => {
    let updatedSelectedSeats = [];
    if (selectedSeats.includes(seat)) {
      // Nếu ghế đã được chọn, hủy bỏ lựa chọn
      updatedSelectedSeats = selectedSeats.filter((s) => s !== seat);
    } else {
      // Nếu ghế chưa được chọn, thêm vào lựa chọn
      updatedSelectedSeats = [...selectedSeats, seat];
    }
    setSelectedSeats(updatedSelectedSeats);
    setList(updatedSelectedSeats);
  };

  useEffect(() => {
    setState({ price: calculateTotalAmount() });
  }, [selectedSeats]);

  useEffect(() => {
    // Nhóm các phần tử theo thuộc tính seat_row
    const groupSeats = () => {
      const grouped = seats.reduce((result, seat) => {
        const { seat_row } = seat;
        if (!result[seat_row]) {
          result[seat_row] = [];
        }
        result[seat_row].push(seat);
        return result;
      }, {});
      setGroupedSeats(grouped);
    };

    groupSeats();
  }, [seats]);

  const calculateTotalAmount = () => {
    let selectedSeatsPrice = 0;

    selectedSeats.forEach((seat) => {
      selectedSeatsPrice += parseFloat(seat.price);
    });
    console.log("calculateTotalAmount = ", selectedSeatsPrice);
    return selectedSeatsPrice.toFixed(3);
  };
  let show_date = new Date(show.start_time);
  return (
    <div className="rowticket ">
      <div className="col-lg-4 col-12 order-sm-last">
        <div className="cardticket cardticket-sm">
          <div className="cardticket-body">
            <div className="rowticket">
              <div className="col-ticket">
                <p className="textticket text-truncate">
                  <strong>{show.movie.name}</strong>
                </p>
                <p className="textticket text-truncate">
                  <strong>{show.Cinema_Room.cinema.name}</strong>
                </p>
                <p className="textticket text-truncate">
                  Suất
                  <strong className="marginticket-left">
                    {show_date.getHours()}:{show_date.getMinutes()}
                  </strong>
                  <strong>
                    {" "}
                    {show_date.getDate()}-{show_date.getMonth()}-
                    {show_date.getFullYear()}{" "}
                  </strong>
                </p>
                <p className="textticket text-truncate">
                  Phòng Chiếu
                  <strong className="marginticket-left">
                    {" "}
                    {show.Cinema_Room.name}{" "}
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="cardticket sticky-header-bars">
          <div className="cardticket-body">
            <div className="rowticket align-items-center ">
              <div className="col-ticket">
                <h6 className="textticket text-uppercase mb-2">
                  Tổng đơn hàng
                </h6>
                <span className="h2 mb-0 textticket">{state.price} đ</span>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div className="col-lg-8 col-12">
        <div class="ticketing-content">
          <div className="seat-selection">
            <div className="legend">
              <div>
                <span></span>
                <p>Ghế Đơn</p>
              </div>
              <div>
                <span className="seat-area-3"></span>
                <p>Ghế Đôi</p>
              </div>
            </div>
            <div className="legend">
              <div>
                <span className="selected"></span>
                <p>Ghế bạn chọn</p>
              </div>
              <div>
                <span className="unavailable"></span>
                <p>Không thể chọn</p>
              </div>

              <div>
                <span className="taken"></span>
                <p>Đã bán</p>
              </div>
            </div>
            <span className="front">Màn hình</span>
            <div className="seats-wrapper-parent">
              <div className="seats-wrapper">
                <div className="seats-wrapper-row">
                  <>
                    <div className="seats seats-row">
                      <div className="row-wrapper">
                        {Object.entries(groupedSeats).map(
                          ([seatRow, seatsInRow]) => (
                            <ul key={seatRow} className="seat-row">
                              <li className="rowname wide">{seatRow}</li>
                            </ul>
                          )
                        )}
                      </div>
                    </div>

                    <div className=" seats seats-map">
                      {Object.entries(groupedSeats).map(
                        ([seatRow, seatsInRow]) => (
                          <div key={seatRow}>
                            {seatsInRow.map((seat) => (
                              <div className="row-wrapper">
                                <ul
                                  key={seat.id}
                                  className={`seat-row ${
                                    selectedSeats.includes(seat) ? "choice" : ""
                                  }`}
                                  onClick={() => handleSeatClick(seat)}
                                >
                                  <li className="textticket">
                                    {seat.seat_num}
                                  </li>
                                </ul>
                              </div>
                            ))}
                          </div>
                        )
                      )}
                    </div>
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChoiceSeat;