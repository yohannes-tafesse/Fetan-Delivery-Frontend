import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import { LanguageContext } from "../Languages/LanguageContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useContext(LanguageContext);
  const navigate = useNavigate();

  const toggleNavbar = () => setIsOpen(!isOpen);
  const closeNavbar = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className="position-fixed start-0 top-0 w-100"
        style={{
          height: "95px",
          zIndex: 10,
          marginTop: "20px",
          backdropFilter: "blur(10px)",
        }}
      ></div>

      <nav
        className={`navbar main-navbar nav-header header navbar-expand-lg mx-auto fixed-top ${
          isScrolled ? "py-1  bg-info" : "py-1 bg-light"
        }`}
        style={{
          transition: "all 0.3s ease-in-out",

          top: "4%",
          zIndex: 1050,
          left: 0,
          right: 0,
        }}
      >
        <div className="container-fluid p-2 d-flex justify-content-between align-items-center">
          <Link
            to="/"
            className={`navbar-brand fs-5 border d-flex justify-content-center align-items-center px-2 py-1 border-success ${
              isScrolled
                ? "text-light border-light "
                : "text-info border-success"
            }`}
            style={{
              transition: "color 0.3s ease-in-out",
            }}
          >
            Fetan Delivery Portal
          </Link>

          <ul className="list-unstyled d-none d-sm-flex mb-2 mb-lg-0 align-items-center gap-3">
            <li className="nav-item">
              <NavLink
                to="/"
                className={`nav-link  fw-bold ${
                  isScrolled ? "text-light" : "text-info"
                }`}
                onClick={closeNavbar}
                style={{
                  transition: "color 0.3s ease-in-out",
                }}
              >
                {t.Home}
              </NavLink>
            </li>
          </ul>

          <button className="btn d-sm-none border-0" onClick={toggleNavbar}>
            <i
              className={`bi ${isOpen ? "bi-x" : "bi-list"} fs-1${
                isScrolled ? "bg-light" : "bg-info"
              }`}
              style={{
                transition: "color 0.3s ease-in-out",
              }}
            ></i>
          </button>

          {/* Mobile Menu */}
          <div
            className={`w-100 pt-5 d-sm-none bg-light`}
            style={{
              padding: isOpen ? "10px 20px" : "0 20px",
              position: "absolute",
              top: "99%",
              height: isOpen ? "25vh" : "0",
              overflow: "hidden",
              left: 0,
              right: 0,
              zIndex: 999,
              transition: "all 0.3s ease-in-out",
              opacity: isOpen ? 1 : 0,
            }}
          >
            <ul className="list-unstyled text-center mb-0">
              <li className="mb-2">
                <NavLink
                  to="/"
                  className="nav-link text-decoration-none text-light"
                  onClick={closeNavbar}
                >
                  {t.Home}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
