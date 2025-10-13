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
          className="pt-3 pb-5 bg-light  px-4 vh-100 overflow-auto d-flex gap-0 justify-content-center align-items-start "
          style={{ width: "100%" }}
        >
          {/* Sidebar */}
          {/* <div className="d-flex  align-items-center mt-1"  >
            <button
              className="btn bg-light my-1 mt-3 d-none align-items-center justify-content-center  me-3 d-xl-flex text-info  "
              onClick={() => dispatch(toggleSidebar())}
              style={{ width: "20px", height: "20px" }}
            >
              <i
                className={` bi ${isSidebarVisible ? "bi-x-lg" : "bi-list"}`}
                style={{
                  fontSize: "12px",
                }}
              ></i>
            </button>
          </div> */}
          {isSidebarVisible && (
            <div
              className="col-xl-2 d-none d-xl-block "
              style={{ marginTop: "1px" }}
            >
              <Sidebar />
            </div>
          )}

          <div
            className={`transition-all rounded-4  ${
              isSidebarVisible ? "w-100 ps-0" : "col-8"
            }`}
            style={{ transition: "all 0.3s ease" }}
          >
            <nav
              className="  shadow-lg  navbar-light   bg-white mb-5 position-fixed top-0 "
              style={{
                marginTop: "31px",
                height: "60px",
                zIndex: "9999",
                width: "80.8%",
              }}
            >
              <div
                className="container-fluid d-flex justify-content-between align-items-center"
                style={{
                  height: "100%",
                }}
              >
                <div className="d-flex gap-1 align-items-center">
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
                  <div
                    className="d-flex align-items-center  gap-2  rounded px-3 py-2 "
                    style={{
                      height: "42px",
                      width: "100%",
                      border: "2px solid #3f5263",
                    }}
                  >
                    <button
                      type="button"
                      className="btn p-0 border-0 bg-transparent text-light"
                      style={{ cursor: "pointer" }}
                    >
                      <i className="bi bi-search fs-5"></i>
                    </button>

                    <input
                      type="text"
                      placeholder="Search..."
                      className="form-control border-0 shadow-none flex-grow-1"
                      style={{ fontSize: "15px" }}
                    />
                  </div>

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
                <div
                  className={`collapse navbar-collapse ${
                    isNavbarOpen ? "show" : ""
                  }`}
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
              className={`mobile-menu-top position-fixed top-8 start-0 w-100 bg-white text-dark ${
                isNavbarOpen ? "menu-open" : "menu-closed"
              } d-lg-none`}
              style={{
                zIndex: 99,
                transition: "transform 0.3s ease-in-out",
                transform: isNavbarOpen
                  ? "translateY(0%)"
                  : "translateY(-100%)",
              }}
            >
              {/* <Link
          to="/dashboard
          className="navbar-brand"
          style={{ width: "75px", height: "75px" }}
        >
          <img
            src="https://fetanmarket.s3.us-east-1.amazonaws.com/assets/LOGO.png"
            alt="Faten Market"
            style={{ width: "50px", height: "50px" }}
          />
        </Link> */}
              <ul
                className="list-unstyled d-flex flex-column justify-content-center align-items-center"
                style={{ marginTop: "10px" }}
              >
                {profile ? (
                  <>
                    <li className="mb-3">
                      <Link
                        to="/dashboard"
                        onClick={toggleNavbar}
                        className="fw-bold text-black text-decoration-none"
                        style={{ fontSize: "14px" }}
                      >
                        {t.dashboard}
                      </Link>
                    </li>
                    <li className="mb-3">
                      <Link
                        to="/order"
                        onClick={toggleNavbar}
                        className="fw-bold text-black text-decoration-none"
                        style={{ fontSize: "14px" }}
                      >
                        {t.orders}
                      </Link>
                    </li>
                    <li className="mb-3">
                      <Link
                        to="/website"
                        onClick={toggleNavbar}
                        className="fw-bold text-black text-decoration-none"
                        style={{ fontSize: "14px" }}
                      >
                        {t.website}
                      </Link>
                    </li>

                    <li className="mb-3">
                      <Link
                        to="/transaction"
                        onClick={toggleNavbar}
                        className="fw-bold text-black text-decoration-none"
                        style={{ fontSize: "14px" }}
                      >
                        {t.transaction}
                      </Link>
                    </li>
                    <li className="mb-3">
                      <Link
                        to="/welcome"
                        onClick={toggleNavbar}
                        className=" fw-bold text-black text-decoration-none"
                        style={{ fontSize: "14px" }}
                      >
                        {t.profile}
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="mb-3">
                      <Link
                        to="/auth/login"
                        onClick={toggleNavbar}
                        className="fw-bold text-decoration-none"
                        style={{ fontSize: "14px" }}
                      >
                        {t.login}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/auth/register"
                        onClick={toggleNavbar}
                        className="fw-bold text-decoration-none"
                        style={{ fontSize: "14px" }}
                      >
                        {t.register}
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
          {/* Main Content */}
          <main
            className={` bg-info p-4  ${
              isSidebarVisible ? "col-xl-10" : "col-12"
            }`}
            style={{ marginTop: "95px", width: "84.2%" }}
          >
            {children}
          </main>
        </div>
      </>
    </div>
  );
};

export default Layout;
