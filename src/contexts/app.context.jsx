import { createContext, useState } from "react";


export const AppContext = createContext();

// const initialCity =

export const AppProvider = ({ children }) => {
  // const [city, setCity] = useState(initialCity);
  const [isActive, setIsActive] = useState(true);
  return (
    <AppContext.Provider
      value={{
        isActive,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
