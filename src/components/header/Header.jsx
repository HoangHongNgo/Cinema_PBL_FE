import React, { useRef, useEffect, useState, useContext } from "react";
import AppContext from "../../contexts/app.context";
import { GetToken, RemovedUserSession } from "../../utils/Common";

import { Link } from "react-router-dom";

import "./header.scss";

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);
  // const { pathname } = useLocation();
  const headerRef = useRef(null);
  // const active = headerNav.findIndex(e=>e.path === pathname);
  const handleLogout = () => {
    RemovedUserSession();
  };

  const [userName, setUserName] = useState("");

  useEffect(() => {
    console.log("isLoggedIn : ", isLoggedIn);
    setUserName(localStorage.getItem("username"));
  }, [isLoggedIn]);

  useEffect(() => {
    setIsLoggedIn(GetToken() ? true : false);
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 90 ||
        document.documentElement.scrollTop > 90
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };
    window.addEventListener("scroll", shrinkHeader);
    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  }, []);
  //const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div ref={headerRef} className="header">
      <div className="header_wrap container">
        <div className="logo">
          <Link to="/">
            <img
              src="https://metiz.vn/static/assets/websites/images/Metiz_logo/METIZ_LOGO_WEB.png"
              alt=""
            />
          </Link>
        </div>

        <ul className="header__nav">
          {/* // headerNav.map((e,setSelectedItem)=>(
                    //     <li key={selectedItem} className={`${selectedItem===active? 'active':''}`}>
                    //         <Link to={e.path}>
                    //             {e.display}
                    //         </Link>
                    //     </li>
                    // )) */}

          <li className="dropdown">
            <Link
              to="category/3"
              className="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              //   aria-aria-haspopup="true"
              aria-expanded="false"
            >
              Phim
            </Link>
            <ul className="dropdown-menu">
              <li>
                <Link to="category/1">Phim đang chiếu</Link>
              </li>
              <li>
                <Link to="category/2">Phim sắp chiếu</Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to="/buyticket">Lịch Chiếu</Link>
          </li>

          <li>
            <Link to="/blog">Blog Phim</Link>
          </li>
          <li>
            <Link to="/blog">Khuyến mãi</Link>
          </li>

          <li className="dropdown">
            <Link
              to="/blog"
              className="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              //   aria-aria-haspopup="true"
              aria-expanded="false"
            >
              Thành viên
            </Link>
            <ul className="dropdown-menu">
              <li>
                <Link to="/blog">Tài khoản</Link>
              </li>
              <li>
                <Link to="/blog">Quyền lợi</Link>
              </li>
              <li>
                <Link to="/history">Lịch sử</Link>
              </li>
            </ul>
          </li>
        </ul>
        {!isLoggedIn ? (
          <ul className="header__user">
            <li className="dropdown__user">
              <Link to="/login">Đăng nhập</Link>
            </li>
            <span>/</span>
            <li>
              <Link to="/register">Đăng ký</Link>
            </li>
          </ul>
        ) : (
          <ul className="header__user">
            <li className="dropdown__user">
              <Link to="/login" onClick={handleLogout}>
                {userName}
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Header;
