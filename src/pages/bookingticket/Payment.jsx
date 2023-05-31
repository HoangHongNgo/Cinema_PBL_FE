import React, { useContext } from "react";
import ListTicket from "../../context/ListTicket";
import Ticket from "../../context/Ticket";



import './Bookingticket.scss';

const Payment=(props)=>{

    const [state, setState]=useContext(Ticket)
    const[list,setList]=useContext(ListTicket);


    return(
    <div className="">
        <div className="rowticket">
            <div className="col-lg-4 col-12 order-sm-last">
                <div className="cardticket sticky-header-bars">
                    <div className="cardticket-body">
                        <div className="rowticket align-items-center">
                            <div className="col-ticket">
                                <h6 className="text-uppercase text-center text-black">
                                    Tổng đơn hàng
                                </h6>
                                <span className="h2 text-center text-black">
                                    {parseInt(state.price)+3.000}.000 đ
                                </span>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className="cardticket d-lg-bloc">
                    <div className="cardticket-body textticket">
                        
                        Vé đã mua không thể đổi hoặc hoàn tiền.
                        <br></br>
                        Mã vé sẽ được gửi <strong>01</strong>  lần qua số điện thoại và email đã nhập. Vui lòng kiểm tra lại thông tin trước khi tiếp tục.
                            
                    </div>
                </div>
                
            </div>
            <div className="col-lg-8 col-12">
                <div>
                    <div className="cardticket">
                        <div className="cardticket-header bg-light">
                            <div className="textticket">
                                Tóm tắt đơn hàng
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Mô tả</th>
                                        <th className="text-center">Số lượng</th>
                                        <th className="text-right">Thành tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Ghế Đơn</td>
                                        <td className="text-center">{list.length}</td>
                                        <td className="text-right">{state.price} đ</td>
                                    </tr>
                                    <tr>
                                        <td>Phí tiện ích</td>
                                        <td className="text-center"></td>
                                        <td className="text-right"> 3.000 đ</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>Tổng</td>
                                        <td className="text-right">{parseInt(state.price)+3.000}.000 đ</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="cardticket">
                        <div className="cardticket-header bg-light">
                            <div className="textticket">
                                Hình thức thanh toán
                            </div>
                        </div>
                        <div className="cardticket-body">
                            <div className="payment-gateway active"> 
                                <i className="fe pg-checked"></i>
                                <div className="pg-info textticket">
                                    <img src="https://cdn.moveek.com/bundles/ornweb/img/momo-icon.png"></img>
                                    Ví MoMo
                                </div>
                            </div>
                            <div className="payment-gateway active"> 
                                <i className="fe pg-checked"></i>
                                <div className="pg-info textticket">
                                    <img src="https://cdn.moveek.com/bundles/ornweb/img/momo-icon.png"></img>
                                    Ví MoMo
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="cardticket d-lg-none"></div>
                </div>
            </div>
            
        </div>
    </div>
    );
}

export default Payment;


