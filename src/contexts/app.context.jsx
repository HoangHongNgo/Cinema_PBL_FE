import { createContext, useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { getCity } from "../api/lichchieu.api";
import { useQuery } from "@tanstack/react-query";

 const AppContext = createContext();

// const initialCity =

export const AppProvider = ({ children }) => {
  // const [city, setCity] = useState(initialCity);
  const [isActive, setIsActive] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AppContext.Provider
      value={{
        isActive,isLoggedIn,setIsLoggedIn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext