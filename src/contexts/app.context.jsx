import { createContext, useState } from "react";

const AppContext = createContext();

// const initialCity =

export const AppProvider = ({ children }) => {
  // const [city, setCity] = useState(initialCity);
  const [isActive, setIsActive] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    token: "",
    username: "",
    name: "",
  });

  return (
    <AppContext.Provider
      value={{
        isActive,
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
