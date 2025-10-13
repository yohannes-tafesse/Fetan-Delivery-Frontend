import React, { useRef, useEffect } from "react";
import "./Login.css";

const OtpModal = ({
  otp,
  setOtp,
  onSubmit,
  onClose,
  otpError,
  setOtpError,
  otpSucess,
}) => {
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, ""); // Only digits
    if (!value) return;

    const newOtp = otp.split("");
    newOtp[index] = value;
    setOtp(newOtp.join(""));

    if (otpError) setOtpError("");

    if (index < 5 && value) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = otp.split("");
      if (otp[index]) {
        // Clear current value
        newOtp[index] = "";
        setOtp(newOtp.join(""));
      } else if (index > 0) {
        // Move back and clear previous
        newOtp[index - 1] = "";
        setOtp(newOtp.join(""));
        inputsRef.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, "");
    if (pasteData.length === 6) {
      setOtp(pasteData);
      pasteData.split("").forEach((digit, i) => {
        if (inputsRef.current[i]) {
          inputsRef.current[i].value = digit;
        }
      });
      inputsRef.current[5].focus();
    }
    e.preventDefault();
  };

  useEffect(() => {
    // Focus on first box when modal opens
    if (inputsRef.current[0]) inputsRef.current[0].focus();
  }, []);

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="otp-modal modal-content border-0 shadow">
          <div className="modal-header d-flex justify-content-between">
            <h5 className="modal-title text-light">Enter OTP</h5>
            <button
              type="button"
              className="btn p-0 border-0 bg-transparent"
              onClick={onClose}
              aria-label="Close"
            >
              <i className="bi bi-x fs-4 text-light"></i>
            </button>
          </div>
          <div className="modal-body">
            <div className="d-flex justify-content-center gap-2 gap-md-4 my-md-3">
              {[...Array(6)].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className={`form-control verification-input text-center fs-4 ${
                    otpSucess
                      ? "border-success bg-light"
                      : otpError
                      ? "border-danger bg-light"
                      : ""
                  }`}
                  value={otp[index] || ""}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={index === 0 ? handlePaste : undefined} // only first box
                  ref={(el) => (inputsRef.current[index] = el)}
                  style={{
                    width: "45px",
                    height: "45px",
                    border: otpSucess
                      ? "2px solid green"
                      : otpError
                      ? "2px solid red"
                      : "1px solid #ced4da",
                    backgroundColor: otpError
                      ? "#f8d7da"
                      : otpSucess
                      ? "#d4edda"
                      : "#fff",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>
            {otpError && (
              <p className="text-danger mt-2 text-center fw-semibold">
                {otpError}
              </p>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-light text-info"
              onClick={onSubmit}
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpModal;
