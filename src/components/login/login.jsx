import React from "react";
import { useMutation } from "@tanstack/react-query";
import "./login.scss";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { schema } from "../../utils/rules";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../input/Input";
import { login } from "../../api/auth.api";
//liem
const loginSchema = schema.omit(["confirm_password"]);
export const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const loginMutation = useMutation({
    mutationFn: (body) => login(body),
  });

  // const onSubmit = (data) => console.log(data);
  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        // setIsAuthenticated(true);
        // setProfile(data.data.data.user);
        // navigate("/");
        console.log(data);
      },
      //   onError: (error) => {
      //     if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
      //       const formError = error.response?.data.data

      //       if (formError) {
      //         Object.keys(formError).forEach((key) => {
      //           setError(key as keyof FormData, {
      //             message: formError[key as keyof FormData],
      //             type: 'Server'
      //           })
      //         })
      //       }
      //     }
      //   }
    });
  });

  return (
    <div className="login">
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
