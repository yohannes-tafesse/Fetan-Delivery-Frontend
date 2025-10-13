import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import "./Layout.css";
import LanguageSelector from "../pages/Languages/LanguageSelector";
import { LanguageContext } from "../pages/Languages/LanguageContext";
import Sidebar from "./Sidebar/Sidebar";
import "../components/Sidebar/sidebar.css";

import { toggleSidebar } from "../features/Sidebar/collapseSlice.js";

const Layout = ({ children }) => {
  const { profile } = useSelector((state) => state.auth);

  const { website } = useSelector((state) => state.dashboard);

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const isSidebarVisible = useSelector(
    (state) => state.collapse.isSidebarVisible
  );

  const [showDropdown, setShowDropdown] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const dispatch = useDispatch();

  const { t } = useContext(LanguageContext);
  const location = useLocation();
  const isWebsitePath = location.pathname === "/website";
  const dropdownRef = useRef();
  console.log(isWebsitePath, "ffff");
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    window.location.reload();
  };

  const toggleNavbar = () => setIsNavbarOpen((prev) => !prev);

  return (
    <div>
      <div
        className="navbar-expand-lg  navbar-light bg-light fixed-top"
        style={{ zIndex: "99999" }}
      >
        <LanguageSelector />
      </div>

      <>
        <div
          className="pt-3 pb-5 bg-light   dashboard-header  vh-100 overflow-auto d-flex gap-0 align-items-start "
          style={{ width: "100%" }}
        >
          {isSidebarVisible && (
            <div
              className="col-xl-2 col-2 d-none d-lg-block"
              style={{ marginTop: "1px" }}
            >
              <Sidebar />
            </div>
          )}

          <div
            className={`transition-all rounded-4  ${
              isSidebarVisible ? "col-12 ps-0" : "col-12"
            }`}
            style={{ transition: "all 0.3s ease" }}
          >
            <nav
              className="  shadow-lg dashboard-navbar navbar-light col-12 colxl-9  bg-white mb-5 position-fixed top-0 "
              style={{
                marginTop: "31px",
                height: "60px",
                zIndex: "9999",
              }}
            >
              <div
                className="container-fluid d-flex justify-content-between align-items-center"
                style={{
                  height: "100%",
                }}
              >
                <div
                  className="d-flex gap-1  justify-content-between align-items-center"
                  style={{ width: "100%" }}
                >
                  <div className="fs-5 text-danger">{t.companyportal}</div>
                  <div className="d-flex gap-3 align-items-center jutify-content-end">
                    <button
                      className=" d-lg-none border-0 d-flex align-items-center justify-content-center  rounded-2 bg-light text-info m-3 z-1030"
                      onClick={toggleNavbar}
                      style={{ zIndex: 1030, width: "25px", height: "25px" }}
                    >
                      <i
                        className={`bi ${isNavbarOpen ? "bi-x" : "bi-list"}`}
                        style={{ fontSize: "1rem", fontWeight: "bold" }}
                      ></i>
                    </button>
                    {/* Avatar */}
                    <li className="d-flex d-lg-none dropdown" ref={dropdownRef}>
                      <img
                        src="https://placehold.co/600x400"
                        alt="avatar"
                        className="rounded-circle"
                        onClick={() => setShowDropdown(!showDropdown)}
                        style={{
                          width: "35px",
                          height: "35px",
                          objectFit: "cover",
                          cursor: "pointer",
                        }}
                      />
                      <ul
                        className={`dropdown-menu mt-2 ${
                          showDropdown ? "show" : ""
                        }`}
                        style={{
                          minWidth: "250px",
                          position: "absolute",
                          top: "80%",
                          right: "0%",
                          border: "none",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                        }}
                      >
                        <li className="mb-3">
                          <Link
                            to="/welcome"
                            className={`dropdown-item ${
                              location.pathname === "/welcome" ? "active" : ""
                            }`}
                            onClick={() => setShowDropdown(false)}
                          >
                            {t.welcome}, {profile?.username}
                          </Link>
                        </li>
                        <li className="d-flex justify-content-center mb-3 align-items-center">
                          <button
                            onClick={() => {
                              handleLogout();
                              setShowDropdown(false);
                            }}
                            className="dropdown-item text-info p-2  rounded-2 d-flex justify-content-center align-items-center bg-light"
                            style={{ width: "80px" }}
                          >
                            {t.logout}
                          </button>
                        </li>
                      </ul>
                    </li>
                  </div>
                </div>
                <div
                  className={`collapse  ${isNavbarOpen ? "show" : ""}`}
                  id="navbarNav"
                ></div>
                {/* Avatar */}
                <li
                  className="d-none d-lg-flex justify-content-end dropdown"
                  ref={dropdownRef}
                >
                  <img
                    src="https://placehold.co/600x400"
                    alt="avatar"
                    className="rounded-circle me-3"
                    onClick={() => setShowDropdown(!showDropdown)}
                    style={{
                      width: "30px",
                      height: "30px",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                  />
                  <ul
                    className={`dropdown-menu mt-2 ${
                      showDropdown ? "show" : ""
                    }`}
                    style={{
                      minWidth: "250px",
                      position: "absolute",
                      top: "80%",
                      right: "0%",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    }}
                  >
                    <li className="mb-3">
                      <Link
                        to="/welcome"
                        className={`dropdown-item ${
                          location.pathname === "/welcome" ? "active" : ""
                        }`}
                        onClick={() => setShowDropdown(false)}
                      >
                        {t.welcome}, {profile?.username}
                      </Link>
                    </li>
                    <li className="d-flex justify-content-center mb-3 align-items-center">
                      <button
                        onClick={() => {
                          handleLogout();
                          setShowDropdown(false);
                        }}
                        className="dropdown-item rounded-2 p-2 d-flex justify-content-center align-items-center text-info bg-light"
                        style={{ width: "80px" }}
                      >
                        {t.logout}
                      </button>
                    </li>
                  </ul>
                </li>
              </div>{" "}
            </nav>
            <div
              className={`mobile-menu-top position-fixed  start-0 w-100 bg-white text-dark ${
                isNavbarOpen ? "menu-open" : "menu-closed"
              } d-lg-none`}
              style={{
                zIndex: 99,
                top: "90px",
                transition: "transform 0.3s ease-in-out",
                transform: isNavbarOpen
                  ? "translateY(0%)"
                  : "translateY(-100%)",
              }}
            >
              <ul
                className="list-unstyled d-flex flex-column justify-content-center align-items-center"
                style={{ marginTop: "10px" }}
              >
                <>
                  <li className="mb-3">
                    <Link
                      to="/dashboard"
                      onClick={toggleNavbar}
                      className="fw-bold text-light text-decoration-none"
                      style={{ fontSize: "14px" }}
                    >
                      {t.dashboard}
                    </Link>
                  </li>
                  <li className="mb-3">
                    <Link
                      to="/delivery-request"
                      onClick={toggleNavbar}
                      className="fw-bold text-light text-decoration-none"
                      style={{ fontSize: "14px" }}
                    >
                      {t.deliveryrequest}
                    </Link>
                  </li>
                  <li className="mb-3">
                    <Link
                      to="/company"
                      onClick={toggleNavbar}
                      className="fw-bold text-light text-decoration-none"
                      style={{ fontSize: "14px" }}
                    >
                      {t.company}
                    </Link>
                  </li>

                  <li className="mb-3">
                    <Link
                      to="/delivery"
                      onClick={toggleNavbar}
                      className="fw-bold text-light text-decoration-none"
                      style={{ fontSize: "14px" }}
                    >
                      {t.delivery}
                    </Link>
                  </li>
                </>
              </ul>
            </div>
            {/* Main Content */}
            <main
              className={` bg-info p-4 right-main-content  ${
                isSidebarVisible ? "col-xl-9" : "col-12"
              }`}
              style={{
                marginTop: "95px",
              }}
            >
              {children}
            </main>
          </div>
        </div>
      </>
    </div>
  );
};

export default Layout;
