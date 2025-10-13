import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { LanguageContext } from "../../pages/Languages/LanguageContext";
import "./sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { t } = useContext(LanguageContext);

  return (
    <div
      className="sidebar shadow-lg d-flex flex-column  position-fixed   "
      style={{
        height: "93vh",
        marginTop: "14px",
      }}
    >
      <Link to="/dashboard" className="navbar-brand">
        <div className="text-light text-center mb-3 fs-5 fw-bold">
          Fetan Delivery Portal
        </div>
      </Link>
      <ul className="list-group rounded-0 ">
        <li className="  list-group-item list-hover sidebar-item ">
          <NavLink to="/dashboard" className="list-sub-hover ">
            <i
              className="bi bi-speedometer2 text-light list-hover-icon sidebar-icon"
              style={{ fontSize: "14px" }}
            ></i>

            <span className="list-hover-text " style={{ fontSize: "14px" }}>
              {t.dashboard}{" "}
            </span>
          </NavLink>
        </li>
        <li className="  list-group-item list-hover sidebar-item ">
          <NavLink to="/delivery-request" className="list-sub-hover ">
            <i
              className="bi text-light bi-box  list-hover-icon sidebar-icon"
              style={{ fontSize: "14px" }}
            ></i>

            <span className="list-hover-text " style={{ fontSize: "14px" }}>
              {t.deliveryrequest}{" "}
            </span>
          </NavLink>
        </li>
        <li className="  list-group-item list-hover sidebar-item">
          <NavLink to="/company" className="list-sub-hover">
            <i
              className="bi text-light bi-window-sidebar   list-hover-icon sidebar-icon"
              style={{ fontSize: "14px" }}
            ></i>
            <span className="list-hover-text  " style={{ fontSize: "14px" }}>
              {t.company}
            </span>
          </NavLink>
        </li>

        <li className="list-group-item list-hover sidebar-item">
          <NavLink to="/delivery" className="list-sub-hover">
            <i
              className="bi text-light list-hover-icon  bi-truck sidebar-icon"
              style={{ fontSize: "14px" }}
            ></i>
            <span className="list-hover-text " style={{ fontSize: "14px" }}>
              {t.delivery}{" "}
            </span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
