import React, { useState, useContext, useRef, useEffect } from "react";
import { LanguageContext } from "./LanguageContext";

const LanguageSelector = () => {
  const { changeLanguage, language } = useContext(LanguageContext);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (lang) => {
    changeLanguage(lang);
    setOpen(false);
  };

  return (
    <div className="bg-danger" style={{ padding: "3px", height: "30px" }}>
      <div
        className="position-relative  text-end  text-primary"
        style={{ right: "10px" }}
        ref={dropdownRef}
      >
        <div
          className=""
          onClick={() => setOpen(!open)}
          aria-haspopup="true"
          aria-expanded={open}
          title="Select Language"
          style={{ cursor: "pointer", color: "#fff", fontSize: "14px" }}
        >
          <i
            class="bi bi-translate "
            style={{ marginRight: "3px", fontSize: "12px" }}
          ></i>{" "}
          Language
        </div>

        {open && (
          <ul
            className="dropdown-menu show"
            style={{
              position: "absolute",
              right: 0,
              marginTop: "0.1rem",
              zIndex: 9999999,
            }}
          >
            <li>
              <button
                className={`dropdown-item ${
                  language === "English" ? "active" : ""
                }`}
                style={{
                  backgroundColor: language === "English" ? "#7330FA" : "",
                }}
                onClick={() => handleSelect("English")}
              >
                English
              </button>
            </li>
            <li>
              <button
                className={`dropdown-item ${
                  language === "Spanish" ? "active" : ""
                }`}
                style={{
                  backgroundColor: language === "Spanish" ? "#7330FA" : "",
                }}
                onClick={() => handleSelect("Spanish")}
              >
                Spanish
              </button>
            </li>
            <li>
              <button
                className={`dropdown-item ${
                  language === "Amharic" ? "active" : ""
                }`}
                style={{
                  backgroundColor: language === "Amharic" ? "#7330FA" : "",
                }}
                onClick={() => handleSelect("Amharic")}
              >
                Amharic
              </button>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default LanguageSelector;
