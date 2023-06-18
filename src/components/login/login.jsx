/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect } from "react";
import "./login.scss";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { schema } from "../../utils/rules";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../input/Input";
import AppContext from "../../contexts/app.context";
import { useHistory } from "react-router-dom";
import { RemovedUserSession, SetUserSession } from "../../utils/Common";
import axios from "axios";
import endpoint from "../../api/endpoint";

const loginSchema = schema.omit(["confirm_password"]);

export const Login = () => {
  const { setIsLoggedIn, setUser } = useContext(AppContext);
  useEffect(() => {
    setIsLoggedIn(false);
  }, []);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    axios
      .post(`${endpoint}/user/login/`, data)
      .then((response) => {
        console.log("response : ", response.data);
        setIsLoggedIn(true);
        SetUserSession(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("success");
    history.push("/");
  });

  return (
    <div className="login my-56 ">
     <div className="login_container">
        <ul className="nav_container md:ml-12">
          <li className="nav_login">
            <Link to="/login" className="a_login">
              Đăng Nhập
            </Link>
          </li>
          <li className="nav_register ">
            <Link to="/register" className="a_register">
              Đăng Ký
            </Link>
          </li>
        </ul>
        <div className="form_container xl:w-full md:w-5/6 md:mx-auto ">
          <form onSubmit={onSubmit} noValidate >
            <div className="form_information xl:flex-nowrap md:flex-wrap ">
              <Input
                name="email"
                label="Email"
                register={register}
                placeholder="Nhập Email Ở Đây"
                errorMessage={errors.email?.message}
                type="email"
                className="form_input"
              />

              <Input
                label="Mật Khẩu"
                name="password"
                register={register}
                placeholder="Nhập Mật Khẩu Ở Đây"
                errorMessage={errors.password?.message}
                type="password"
                className="form_input mr-5"
                autoComplete="on"
              />
            </div>
            <div className="button_form">
              <button className="btn_form" type="submit">
                Đăng Nhập
              </button>
            </div>
            <div className="forgotPassword_form">
              <Link to="/">
                <span>Tìm lại mật khẩu?</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
      
    </div>
  );
};
