import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SuccessModal = ({ onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleLoginClick = () => {
    onClose();
    navigate("/auth/login");
  };

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.1)" }}
      tabIndex="1"
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content border-0 shadow">
          <div className="modal-header d-flex justify-content-between bg-info text-white">
            <h5 className="modal-title text-info">Success</h5>
            <button
              type="button"
              className="btn border-0 bg-transparent p-0"
              onClick={onClose}
              aria-label="Close"
            >
              <i className="bi bi-x text-info fs-4"></i>
            </button>
          </div>
          <div className="modal-body text-center">
            <h5 className="mb-3"> Registered Successfully!</h5>
            <p>You can now log in with your account.</p>
            <button
              className="btn btn-light text-info mt-2"
              onClick={handleLoginClick}
            >
              Go to Login
            </button>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-outline-success bg-danger text-info"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
