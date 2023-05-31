import "swiper/swiper.min.css";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./App.scss";
import React from "react";
import 'tailwindcss/tailwind.css'

import { BrowserRouter, Route } from "react-router-dom"; //v5
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";

import Routes from "./config/Routes";


import Blog from "./pages/blog/Blog";
import Bookingticket from "./pages/bookingticket/Bookingticket";

function App() {
  return (
    <BrowserRouter>
      <Route
        render={(props) => (
          <>
            <Header {...props} />
            <Routes />
            
            {/* <Bookingticket></Bookingticket> */}
            <Footer />
          </>
        )}
      />
    </BrowserRouter>
  );
}

export default App;
