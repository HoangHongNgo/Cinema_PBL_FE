import React, { useState,useEffect } from "react";
import PageHeader from "../../components/page-header/PageHeader";
import axios from "axios";
import { useHistory } from "react-router-dom";

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
        axios.get(`https://cinema-00wj.onrender.com/tickets/list/${userid}/`)
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
                    <div className="bg-slate-200 flex flex-wrap w-full my-6 p-4 hover:scale-105">
                        <div className="flex w-1/3">
                        </div>
                        <div className="grow basis-0">
                            <h4 className="text-red-500 uppercase font-bold ">Tên phim - ngày chiếu</h4>
                            <div className="text-black"> Tên phòng - Tên rạp </div>
                        </div>
                    </div>
                    <div className="bg-slate-200 flex flex-wrap w-full my-6 p-4 hover:scale-105">
                        <div className="flex w-1/3">
                        </div>
                        <div className="grow basis-0">
                            <div className="text-red-500 uppercase font-bold">Tên phim - ngày chiếu</div>
                            <div className="text-black"> Tên phòng - Tên rạp </div>
                        </div>
                    </div>
                </div>
                <div className="w-1/5"></div>
            </div>

        </div>
    );
};

export default History;
