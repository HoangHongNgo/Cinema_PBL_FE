import axiosClient from "./axiosClient";
import React, {useContext,useState} from "react";
import {SetUserSession} from '../utils/Common'

export const login = (body) => {
  
  axiosClient.post("/user/login/", body)
  .then((response) => {
    console.log(response);
    SetUserSession(response.token)
  })
  .catch((err) => {
    console.log(err);
  });
};

export const registerUser = (body) => {
  axiosClient.post("/user/register/", body)
  .then((response) => {
    console.log(response.token);

  })
  .catch((err) => {
    console.log(err);
  });
};
