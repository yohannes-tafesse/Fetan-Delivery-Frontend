import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";

import "./Login.css";

import {
  loginUser,
  fetchProfile,
  loginWithNumber,
  loginverify,
} from "../../features/auth/authSlice";
import { LanguageContext } from "../Languages/LanguageContext";

import Header from "../LandingPage/Header";
import Footer from "../LandingPage/Footer";

import OtpModal from "./OTPModal";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import toast from "react-hot-toast";
import { BackgroundGradient } from "../../components/Animations/BackgroundGradient";

import LanguageSelector from "../Languages/LanguageSelector";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    phoneNumber: "",
    password: "",
  });
  const [mobFormData, setMobFormData] = useState({
    phoneNumber: "",
    rawPhoneNumber: "",
  });

  const handlePhoneChange = (phone) => {
    setFormData({
      ...formData,
      phone: phone, // sets full number with country code
    });
  };
  const [activeTab, setActiveTab] = useState("tab2");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const { t } = useContext(LanguageContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const handleShowClick = () => {
    navigate(`/store/${id}`);
  };
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 520);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      loginUser({
        username: formData.username,
        phone_Number: formData.phoneNumber,
        password: formData.password,
      })
    )
      .unwrap()
      .then((res) => {
        if (res.payload.role === "admin") {
          navigate("/superadmin/dashboard");
        } else {
          navigate("/dashboard");
          dispatch(fetchProfile());
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };
  // const handleSubmitWithNumber = (e) => {
  //   e.preventDefault();

  //   const phoneNumber = `+${formData.phone}`;
  //   const roleName = "user";

  //   dispatch(
  //     loginWithNumber({ phone_Number: phoneNumber, role_name: roleName })
  //   )
  //     .unwrap()
  //     .then((res) => {
  //       if (res.status === 200 || res.success) {
  //         setShowOtpModal(true);
  //       } else {
  //         console.log(res.detail);
  //       }
  //     })
  //     .catch((err) => {
  //       console.error("Login Error:", err);
  //       toast.error(err.detail);
  //     });
  // };
  const handleSubmitWithNumber = (e) => {
    e.preventDefault();

    // Determine phone number based on screen/device
    const phoneNumber = mobFormData.phoneNumber;

    const roleName = "user";

    // Dispatch login with number
    dispatch(
      loginWithNumber({ phone_Number: phoneNumber, role_name: roleName })
    )
      .unwrap()
      .then((res) => {
        if (res.status === 200 || res.success) {
          setShowOtpModal(true);
          toast.success("OTP sent successfully!");
        } else {
          console.log(res.detail);
          toast.error(res.detail || "Login failed");
        }
      })
      .catch((err) => {
        console.error("Login Error:", err);
        toast.error(err.detail || "Login failed");
      });
  };

  const handleOtpSubmit = () => {
    if (!/^\d{6}$/.test(otp)) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }
    const data = {
      otp: otp,
      phone_number: mobFormData.phoneNumber,
      role_name: "user",
    };
    dispatch(loginverify(data))
      .unwrap()
      .then((res) => {
        setShowOtpModal(false);
      })
      .catch((err) => {
        console.error("OTP Error ", err);
        setOtpError(err.message || "Please enter the valid code");
      });
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchProfile())
        .unwrap()
        .then((profile) => {
          console.log("Fetched profile:", profile);

          if (profile?.user.role === "admin") {
            navigate("/superadmin/dashboard");
          } else {
            navigate("/dashboard");
          }
        })
        .catch((error) => {
          console.error("Profile fetch error:", error);
        });
    }
  }, [isAuthenticated, navigate, dispatch]);

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
        duration: 0.6,
      },
    },
    exit: {
      x: "100vw",
      opacity: 0,
      transition: { duration: 0.4 },
    },
  };

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
        <div
          className="container border-2 position-relative"
          style={{ zIndex: 2 }}
        >
          <div
            className="d-flex row  flex-column justify-content-center align-items-center text-center "
            style={{
              position: "relative",
            }}
          >
            <div className="d-flex row  justify-content-center align-items-center">
              <div className="col-lg-4 col-sm-12   mb-4 ">
                <div className="bg-info  p-2" containerClassName="my-4">
                  <div
                    className=" pt-4  rounded-4   bg-info "
                    style={{
                      background: "transparent",
                    }}
                  >
                    <div>
                      <div className="card-body  ">
                        <div className="container  ">
                          {/* Tabs */}
                          <ul className="nav ">
                            <li className="nav-item">
                              <button
                                style={{
                                  border: "none",
                                  padding: "4px 12px",
                                }}
                                onClick={() => setActiveTab("tab1")}
                                className={`tab-item position-relative bg-info ${
                                  activeTab === "tab1"
                                    ? "border-bottom border-4  border-light"
                                    : ""
                                }  ${
                                  activeTab === "tab1"
                                    ? "text-light bg-info"
                                    : ""
                                }`}
                              >
                                {t.login}
                              </button>
                            </li>
                            <li className="nav-item ">
                              <button
                                style={{
                                  border: "none",
                                  padding: "4px 12px",
                                }}
                                onClick={() => setActiveTab("tab2")}
                                className={`tab-item position-relative bg-info  ${
                                  activeTab === "tab2"
                                    ? "border-bottom border-4  border-light"
                                    : ""
                                }  ${
                                  activeTab === "tab2"
                                    ? "text-light bg-info"
                                    : ""
                                }`}
                              >
                                {t.loginWithNumber}
                              </button>
                            </li>
                          </ul>

                          {/* Tab Content */}
                          <div className="tab-content mt-3 ">
                            {activeTab === "tab1" && (
                              <div className="tab-pane fade show active">
                                <div className="card-body">
                                  {error && (
                                    <div className="alert alert-danger">
                                      {error}
                                    </div>
                                  )}
                                  <form onSubmit={handleSubmit}>
                                    <div className="mb-3 text-start">
                                      <label className="form-label ">
                                        {t.username}
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        placeholder={t.UsernamePlaceholder}
                                        value={formData.username}
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
                                      <label className="form-label">
                                        {t.password}
                                      </label>
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
                                    <div className="d-grid">
                                      <button
                                        type="submit"
                                        className="btn btn-light text-info"
                                        disabled={loading}
                                      >
                                        {loading
                                          ? `${t.loggingIn}`
                                          : `${t.login}`}
                                      </button>
                                    </div>
                                  </form>
                                  {isAuthenticated && (
                                    <div className="alert alert-success">
                                      Login successful! Redirecting to
                                      dashboard...
                                    </div>
                                  )}
                                  {error && (
                                    <div className="alert alert-danger">
                                      {error}
                                    </div>
                                  )}
                                  <div className="text-center  mt-3">
                                    <p>
                                      {t.Donothaveanaccount}?
                                      <Link
                                        className="text-light"
                                        to="/auth/register"
                                        style={{ textDecoration: "none" }}
                                        onMouseEnter={(e) =>
                                          (e.target.style.textDecoration =
                                            "underline")
                                        }
                                        onMouseLeave={(e) =>
                                          (e.target.style.textDecoration =
                                            "none")
                                        }
                                      >
                                        {t.register}
                                      </Link>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                            {activeTab === "tab2" && (
                              <div className="tab-pane fade show active">
                                <div className="card-body ">
                                  {error && (
                                    <div className="alert alert-danger">
                                      {error}
                                    </div>
                                  )}
                                  <form onSubmit={handleSubmitWithNumber}>
                                    <div className="mb-3  text-start ">
                                      <div className="mb-3 text-start">
                                        <label className="form-label ">
                                          {t.phoneNumber}
                                        </label>

                                        <div
                                          style={{
                                            position: "relative",
                                            width: "100%",
                                          }}
                                        >
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
                                              const raw =
                                                e.target.value.replace(
                                                  /\D/g,
                                                  ""
                                                ); // Only digits
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
                                    </div>
                                    <div className="d-grid">
                                      <button
                                        type="submit"
                                        className="btn btn-light text-info"
                                        disabled={loading}
                                      >
                                        {loading
                                          ? `${t.loggingIn}`
                                          : `${t.login}`}
                                      </button>
                                    </div>
                                  </form>
                                  {isAuthenticated && (
                                    <div className="alert alert-sucess">
                                      Login successful! Redirecting to
                                      dashboard...
                                    </div>
                                  )}
                                  {error && (
                                    <div className="alert alert-danger">
                                      {error}
                                    </div>
                                  )}
                                  <div className="text-center  mt-3">
                                    <p>
                                      {t.Donothaveanaccount}?
                                      <Link
                                        to="/auth/register "
                                        className="text-light ms-1 "
                                        style={{ textDecoration: "none" }}
                                        onMouseEnter={(e) =>
                                          (e.target.style.textDecoration =
                                            "underline")
                                        }
                                        onMouseLeave={(e) =>
                                          (e.target.style.textDecoration =
                                            "none")
                                        }
                                      >
                                        {t.register}
                                      </Link>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div>
        {showOtpModal && (
          <OtpModal
            otp={otp}
            setOtp={setOtp}
            onSubmit={handleOtpSubmit}
            onClose={() => setShowOtpModal(false)}
            otpError={otpError}
            setOtpError={setOtpError}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default Login;
