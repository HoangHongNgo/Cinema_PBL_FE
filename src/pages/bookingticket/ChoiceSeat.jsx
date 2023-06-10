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
  console.log(Object.entries(groupedSeats));
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
  console.log("Object.entries : ", Object.entries(groupedSeats));
  return (
    <div className="rowticket xl:flex-nowrap md:flex-wrap">
      <div className="col-lg-4 justify-center col-12 xl:mt-20 md:mt-2 order-sm-last flex xl:flex-col md:flex-row md:mx-auto md:w-full xl:w-1/3 space-y-4">
        <div className="cardticket cardticket-sm hover:scale-110 transition-transform duration-300 md:mr-3">
          <div className="cardticket-body">
            <div className="rowticket">
              <div className="col-ticket my-2">
                <p className="textticket text-truncate my-2">
                  <strong>{show.movie.name}</strong>
                </p>
                <p className="textticket text-truncate my-2">
                  <strong>{show.Cinema_Room.cinema.name}</strong>
                </p>
                <p className="textticket text-truncate my-2">
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
                <p className="textticket text-truncate  my-2">
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
        <div className="cardticket sticky-header-bars hover:scale-110 transition-transform duration-300">
          <div className="cardticket-body">
            <div className="rowticket align-items-center ">
              <div className="col-ticket my-4">
                <p className="textticket text-uppercase my-2">
                  <strong>Tổng đơn hàng</strong>
                </p>
                <span className="h2 mb-0 textticket my-2">
                  {parseInt(state.price) + 3.0}.000 đ
                </span>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div className="col-lg-8 col-12 mx-auto">
        <div class="ticketing-content">
          <div className="seat-selection">
            <div className="legend">
              <div>
                <span className="selected"></span>
                <p>Ghế bạn chọn</p>
              </div>
              <div>
                <span></span>
                <p>Ghế Đơn</p>
              </div>

              <div>
                <span className="taken"></span>
                <p>Đã bán</p>
              </div>
            </div>
            <span className="front">Màn hình</span>
            <div className="seats-wrapper-parent">
              <div className="seats-wrapper">
                <div className="seats-wrapper-row flex">
                  <div className="seats seats-row">
                    <div className="row-wrapper lg:mr-7 md:mr-0">
                      {Object.entries(groupedSeats).map(
                        ([seatRow, seatsInRow]) => (
                          <ul key={seatRow} className="seat-row">
                            <li className="rowname wide ">{seatRow}</li>
                          </ul>
                        )
                      )}
                    </div>
                  </div>

                  <div className="seats seats-map xl:mx-auto">
                    {Object.entries(groupedSeats).map(
                      ([seatRow, seatsInRow]) => (
                        <div key={seatRow} className="flex flex-nowrap">
                          {seatsInRow
                            .sort((a, b) => a.seat_num - b.seat_num)
                            .map((seat) => (
                              <div className="row-wrapper bg-white">
                                <ul
                                  key={seat.id}
                                  className={`seat-row ${
                                    selectedSeats.includes(seat) ? "choice" : ""
                                  } ${
                                    seat.owner === null
                                      ? "hover:bg-red-500"
                                      : ""
                                  }`}
                                  onClick={() => {
                                    if (seat.owner == null)
                                      return handleSeatClick(seat);
                                  }}
                                >
                                  <li
                                    className={`textticket  ${
                                      seat.payment == null ? "" : "taken"
                                    } `}
                                  >
                                    {seat.seat_num}
                                  </li>
                                </ul>
                              </div>
                            ))}
                        </div>
                      )
                    )}
                  </div>
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
