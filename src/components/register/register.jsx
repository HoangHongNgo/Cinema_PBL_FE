import React, { useContext, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import "./register.scss";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { schema } from "../../utils/rules";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../input/Input";
import { registerUser } from "../../api/auth.api";
import { RemovedUserSession, SetUserSession } from "../../utils/Common";
import axios from "axios";
import AppContext from "../../contexts/app.context";
import { useHistory } from "react-router-dom";
import endpoint from "../../api/endpoint";

const loginSchema = schema.omit(["confirm_password"]);
export const Register = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const { setIsLoggedIn, setUser } = useContext(AppContext);

  useEffect(() => {
    setIsLoggedIn(false);
  }, []);

  const history = useHistory();

  // const onSubmit = (data) => console.log(data);
  const onSubmit = handleSubmit((data) => {
    console.log(data);
    axios
      .post(`${endpoint}/user/register/`, data)
      .then((response) => {
        console.log("data : ", data);
        console.log("register success");
        console.log("response : ", response.data);
        setIsLoggedIn(true);
        SetUserSession(response.data);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div className="register">
      <div className="login_container">
        <ul className="nav_container">
          <li className="nav_login">
            <Link to="/login" className="a_login">
              Đăng Nhập
            </Link>
          </li>
          <li className="nav_register">
            <Link to="/register" className="a_register">
              Đăng Ký
            </Link>
          </li>
        </ul>
        <div className="form_container">
          <form onSubmit={onSubmit} noValidate>
            <div className="form_information">
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
                className="form_input"
                autoComplete="on"
              />
            </div>
            <div className="form_information">
              <Input
                name="username"
                label="Username"
                register={register}
                placeholder="Nhập Username Ở Đây"
                errorMessage={errors.username?.message}
                type="username"
                className="form_input"
              />

              <Input
                label="Name"
                name="name"
                register={register}
                placeholder="Nhập Tên Ở Đây"
                errorMessage={errors.name?.message}
                type="name"
                className="form_input"
              />
            </div>
            <div className="button_form">
              <button className="btn_form" type="submit">
                Đăng Ký
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
