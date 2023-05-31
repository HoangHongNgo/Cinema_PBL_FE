import React, { useContext } from "react";
import ListTicket from "../../context/ListTicket";
import Ticket from "../../context/Ticket";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { red } from "@mui/material/colors";
import "./Bookingticket.scss";

const StyledFormControlLabel = styled((props) => (
  <FormControlLabel {...props} />
))(({ theme, checked }) => ({
  ".MuiFormControlLabel-label": checked && {
    color: theme.palette.error.main,
  },
}));

function MyFormControlLabel(props) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}

MyFormControlLabel.propTypes = {
  /**
   * The value of the component.
   */
  value: PropTypes.any,
};

const Payment = (props) => {
  const [state, setState] = useContext(Ticket);
  const [list, setList] = useContext(ListTicket);

  return (
    <div className="">
      <div className="rowticket">
        <div className="col-lg-4 col-12 order-sm-last">
          <div className="cardticket sticky-header-bars hover:scale-110 transition-transform duration-300">
            <div className="cardticket-body">
              <div className="rowticket align-items-center">
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
          <div className="cardticket d-lg-bloc hover:scale-110 transition-transform duration-300">
            <div className="cardticket-body textticket m-6">
              Vé đã mua không thể đổi hoặc hoàn tiền.
              <br></br>
              Mã vé sẽ được gửi <strong className="text-red-600">01</strong> lần
              qua số điện thoại và email đã nhập. Vui lòng kiểm tra lại thông
              tin trước khi tiếp tục.
            </div>
          </div>
        </div>
        <div className="col-lg-8 col-12">
          <div>
            <div className="cardticket">
              <div className="cardticket-header bg-light">
                <div className="textticket">Tóm tắt đơn hàng</div>
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
                      <td className="text-right">
                        {parseInt(state.price) + 3.0}.000 đ
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="cardticket">
              <div className="cardticket-header bg-light">
                <div className="textticket">Hình thức thanh toán</div>
              </div>
              <div className="cardticket-body px-4">
                <RadioGroup name="use-radio-group" defaultValue="momo">
                  <MyFormControlLabel
                    value="momo"
                    label="Ví điện tử MoMo"
                    control={<Radio />}
                  />
                  <MyFormControlLabel
                    value="banking"
                    label="Thanh toán qua Ngân hàng"
                    control={<Radio />}
                  />
                </RadioGroup>
              </div>
            </div>
            <div className="cardticket d-lg-none"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
