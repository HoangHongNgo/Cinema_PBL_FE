import React, { useState,useEffect } from "react";
import PageHeader from "../../components/page-header/PageHeader";
import axios from "axios";
import QRCode from "react-qr-code";
import { useHistory } from "react-router-dom";
import endpoint from "../../api/endpoint";

const History=()=>{

    const [ticketowner, setTicketOwner]=useState(null);
    

    let userid = localStorage.getItem('userID');
    let history = useHistory();

    useEffect(()=>{

        if(!userid){
            alert('Bạn cần đăng nhập')
            history.push("/")
        }
        else{
        axios.get(`${endpoint}/tickets/list/${userid}/`)
        .then((response) => {
            setTicketOwner(response.data);
            console.log("ticket owner", response.data);
          })
          .catch((error) => {
            console.error("Lỗi khi lấy dữ liệu từ API:", error);
          });

        }

    },[userid]);
    
    
    console.log("history");
    return (
        <div>
            <PageHeader></PageHeader>
            <div className="flex flex-row justify-between">
                <div className="w-1/5"></div>
                <div className="w-2/3">
                    <div className="uppercase font-extrabold text-2xl hover:scale-110 transition-transform duration-300 hover:text-red-500  text-center ">Vé đã mua</div>
                    {ticketowner?.map((ticket)=>(
                            <div className="bg-neutral-800 rounded-xl flex flex-wrap w-3/4 my-6 mx-auto p-5 h-24">
                                <div className="flex w-1/3">
                                    <QRCode className="w-1/4 " value={"Payment ID: " + ticket.id + " User ID:" + ticket.owner} ></QRCode>
                                </div>
                                <div className="grow basis-0">
                                    <h4 className="text-red-700 uppercase font-bold ">{ticket.tickets[0]?.showtime.movie.name}</h4>
                                    <div className="text-white"> {ticket.tickets[0]?.showtime.Cinema_Room.name} - {ticket.tickets[0]?.showtime.Cinema_Room.cinema.name} </div>
                                </div>
                            </div>
                ))
                    
                    
                    }
                </div>
                <div className="w-1/5"></div>
            </div>

        </div>
    );
};

export default History;
