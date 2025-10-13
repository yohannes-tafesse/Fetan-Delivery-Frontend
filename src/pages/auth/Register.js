import React, { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  verifyEmail,
  verifyPhone,
} from "../../features/auth/authSlice";
import { NavLink, useNavigate } from "react-router-dom";

import Header from "../LandingPage/Header";
import Footer from "../LandingPage/Footer";

import { LanguageContext } from "../Languages/LanguageContext";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import OtpModal from "./OTPModal";
import toast from "react-hot-toast";
import SuccessModal from "./SuccessModal";
import { motion } from "framer-motion";
import { BackgroundGradient } from "../../components/Animations/BackgroundGradient";

import LanguageSelector from "../Languages/LanguageSelector";

const Register = () => {
  const { t } = useContext(LanguageContext);
  const [selectedOption, setSelectedOption] = useState("email");
  const [successModal, setSuccessModal] = useState(false);
  const [focusState, setFocusState] = useState({
    username: false,
    phone: false,
  });
  const [mobFormData, setMobFormData] = useState({
    phoneNumber: "",
    rawPhoneNumber: "",
  });

  console.log(successModal, "success");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role_name: "user",
  });
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState(false);
  const [otpSucess, setOtpSucess] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const handleOptionSelect = (value) => {
    setSelectedOption(value);
    setShowDropdown(false);

    if (value === "email") {
      setFormData((prev) => ({ ...prev, phone: "" }));
    } else {
      setFormData((prev) => ({ ...prev, email: "" }));
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let userData = {
      username: formData.username,
      role_name: "user",
      password: formData.password,
    };

    if (selectedOption === "phone") {
      userData = {
        ...userData,
        phone: mobFormData.phoneNumber,
      };

      dispatch(registerUser(userData))
        .unwrap()
        .then((res) => {
          if (res.status === 200 || res.success) {
            setShowOtpModal(true); // ✅ show OTP for phone
          } else {
            toast.error(res?.message || "Registration failed");
          }
        })
        .catch((error) => {
          console.error("Registration Error:", error);
          toast.error(error?.detail || "Registration failed");
        });
    } else if (selectedOption === "email") {
      userData = {
        ...userData,
        email: formData.email,
      };

      dispatch(registerUser(userData))
        .unwrap()
        .then((res) => {
          if (res.status === 200 || res.success) {
            setShowOtpModal(true); // ✅ show OTP for email also
          } else {
            toast.error(res?.message || "Registration failed");
          }
        })
        .catch((error) => {
          console.error("Registration Error:", error);
          toast.error(error?.detail || "Registration failed");
        });
    }
  };

  const handleOtpSubmit = () => {
    if (!/^\d{6}$/.test(otp)) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }

    let data = { code: otp };

    if (selectedOption === "phone") {
      data.phone_number = mobFormData.phoneNumber;
      dispatch(
        verifyPhone({ phone_number: data.phone_number, code: otp })
      ).then(() => {
        setShowOtpModal(false);
        navigate("/auth/login");
      });
    } else if (selectedOption === "email") {
      data.email = formData.email;
      dispatch(verifyEmail({ email: data.email, otp: otp })).then(() => {
        setShowOtpModal(false);
        navigate("/auth/login");
      });
    } else {
      console.log(error);
    }
  };

  const membertitle = [
    {
      title: "Become Our Member",
      description:
        "Discover a wide range of services tailored to your business needs.",
    },
  ];
  const accordionData = [
    { title: "FetanMarket", description: "FetanMarketDesc" },
    { title: "UseFetanMarket", description: "UseFetanMarketDesc" },
    { title: "customizable", description: "customizableDesc" },
  ];
  const cardData = [
    { title: "OurMissionTitle", description: "OurMissionDesc" },
    { title: "WhyWeExistTitle", description: "WhyWeExistDesc" },
    { title: "OurEdgeTitle", description: "OurEdgeDesc" },
    { title: "OurPromiseTitle", description: "OurPromiseDesc" },
  ];
  const pageVariants = {
    initial: {
      x: "-100vw",
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 20,
        duration: 0.8,
      },
    },
    exit: {
      x: "100vw",
      opacity: 0,
      transition: { duration: 0.4 },
    },
  };

  const navigate = useNavigate();
  const handleShowData = () => {
    navigate(`/store/johnstoree.com`);
  };
  return (
    <>
      <div
        className="navbar-expand-lg navbar-light bg-light fixed-top"
        style={{ zIndex: "99999" }}
      >
        <LanguageSelector />
      </div>
      <Header />
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="d-flex flex-column bg-light justify-content-center align-items-center text-center position-relative"
        style={{
          // backgroundColor: "#0f172a",
          minHeight: "100vh",
          overflow: "hidden",
          paddingTop: "120px",
          paddingBottom: "40px",
          zIndex: 1,
        }}
      >
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div
            className="d-flex  row flex-column justify-content-center align-items-center text-center "
            style={{
              position: "relative",
            }}
          >
            <div className="d-flex justify-content-center  mt-5">
              <div className="col-lg-4 col-sm-12  mb-4">
                <div className="bg-info  p-4" containerClassName="my-4">
                  <div className=" pt-4 bg-info">
                    {/* <div className="card-header"> */}
                    <h3 className="text-center text-light">{t.Register}</h3>
                    {/* </div> */}
                    <div className="card-body ">
                      {error && (
                        <div className="alert alert-danger">{error}</div>
                      )}
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3 text-start">
                          <label className="form-label">{t.username}</label>
                          <input
                            type="text"
                            name="username"
                            className="form-control"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder={t.UsernamePlaceholder}
                            required
                            onFocus={() =>
                              setFocusState((prev) => ({
                                ...prev,
                                username: true,
                              }))
                            }
                            onBlur={() =>
                              setFocusState((prev) => ({
                                ...prev,
                                username: false,
                              }))
                            }
                            style={{
                              borderColor: "#3f5263",
                              outline: "none",
                              boxShadow: "none",
                            }}
                          />
                        </div>
                        {/* <div className="mb-3 text-start">
                          <label className="form-label">Role</label>
                          <select
                            className="form-control"
                            name="role_name"
                            value={formData.role_name}
                            onChange={handleChange}
                            required
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                        </div> */}

                        <div className="mb-3 text-start">
                          <label className="form-label">{t.loginwith}</label>
                          <div
                            className="dropdown w-100"
                            style={{
                              position: "relative",
                            }}
                          >
                            <button
                              className="btn w-100 text-start d-flex justify-content-between border-1 border border-light align-items-center border"
                              type="button"
                              onClick={() => setShowDropdown(!showDropdown)}
                              style={{
                                borderColor: "#3f5263",
                                borderRadius: "0.375rem",
                                outline: "none",
                                boxShadow: "none",
                                backgroundColor: "white",
                                padding: "10px",
                              }}
                            >
                              <span>
                                {selectedOption === "email" ? "Email" : "Phone"}
                              </span>
                              <i
                                className={`bi ${
                                  showDropdown
                                    ? "bi-chevron-up"
                                    : "bi-chevron-down"
                                }`}
                                style={{
                                  fontSize: "1rem",
                                  color: "#3f5263",
                                  transition: "transform 0.3s ease",
                                }}
                              ></i>
                            </button>

                            {showDropdown && (
                              <ul
                                className="dropdown-menu show w-100"
                                style={{
                                  position: "absolute",
                                  top: "100%",
                                  left: 0,
                                  zIndex: 10,
                                  height: "90px",
                                  borderColor: "#3f5263",
                                }}
                              >
                                <li>
                                  <button
                                    className="dropdown-item "
                                    onClick={() => handleOptionSelect("email")}
                                    style={{
                                      borderBottom: "1px solid #3f5263",
                                    }}
                                  >
                                    {t.email}
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className="dropdown-item"
                                    onClick={() => handleOptionSelect("phone")}
                                  >
                                    {t.phone}
                                  </button>
                                </li>
                              </ul>
                            )}
                          </div>
                        </div>

                        {/* Email Input */}
                        {selectedOption === "email" && (
                          <>
                            <div className="mb-3 text-start">
                              <label className="form-label">{t.email}</label>
                              <input
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder={t.EmailPlaceholder}
                                value={formData.email}
                                onChange={handleChange}
                                required
                                style={{
                                  borderColor: "#3f5263",
                                  outline: "none",
                                  boxShadow: "none",
                                }}
                              />
                            </div>
                            <div className="mb-3 text-start">
                              <label className="form-label">{t.password}</label>
                              <input
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder={t.PasswordPlaceholder}
                                value={formData.password}
                                onChange={handleChange}
                                required
                                style={{
                                  borderColor: "#3f5263",
                                  outline: "none",
                                  boxShadow: "none",
                                }}
                              />
                            </div>
                          </>
                        )}

                        {/* Phone Input */}
                        {selectedOption === "phone" && (
                          <div className="mb-3 text-start">
                            <label className="form-label">{t.phone}</label>

                            <div
                              style={{
                                position: "relative",
                                width: "100%",
                              }}
                            >
                              {/* Flag manually shown (optional) */}
                              <img
                                src="https://flagcdn.com/et.svg"
                                alt="Ethiopia"
                                style={{
                                  width: "24px",
                                  height: "16px",
                                  position: "absolute",
                                  left: "10px",
                                  top: "50%",
                                  transform: "translateY(-50%)",
                                }}
                              />

                              {/* Visual fixed +251 prefix */}
                              <span
                                style={{
                                  position: "absolute",
                                  left: "40px",
                                  top: "50%",
                                  transform: "translateY(-50%)",
                                  fontSize: "1rem",
                                  color: "black",
                                  userSelect: "none",
                                }}
                              >
                                +251
                              </span>

                              <input
                                type="tel"
                                maxLength={9}
                                value={mobFormData.rawPhoneNumber}
                                onChange={(e) => {
                                  const raw = e.target.value.replace(/\D/g, ""); // Only digits
                                  setMobFormData({
                                    ...mobFormData,
                                    rawPhoneNumber: raw,
                                    phoneNumber: `+251${raw}`, // full number for backend
                                  });
                                }}
                                placeholder="911 234 567"
                                style={{
                                  width: "100%",
                                  height: "40px",
                                  paddingLeft: "90px", // flag + +251 space
                                  fontSize: "1rem",
                                  border: "2px solid #3f5263",
                                  borderRadius: "0.375rem",
                                  outline: "none",
                                }}
                                required
                              />
                            </div>
                          </div>
                        )}

                        {/* <div className="mb-3 text-start">
                      <label className="form-label">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div> */}
                        <div className="d-grid">
                          <button
                            type="submit"
                            className="btn btn-light text-info"
                            disabled={loading}
                          >
                            {loading ? `${t.Registering}` : `${t.Register}`}
                          </button>
                        </div>
                      </form>
                      <div className="text-center mt-3">
                        <p>
                          {t.Donothaveanaccount}?
                          <NavLink
                            to="/auth/login"
                            className="text-light ms-2 "
                            style={{ textDecoration: "none" }}
                            onMouseEnter={(e) =>
                              (e.target.style.textDecoration = "underline")
                            }
                            onMouseLeave={(e) =>
                              (e.target.style.textDecoration = "none")
                            }
                          >
                            {t.login}
                          </NavLink>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {successModal && <SuccessModal onClose={() => setSuccessModal(false)} />}
      <Footer />
    </>
  );
};

export default Register;
