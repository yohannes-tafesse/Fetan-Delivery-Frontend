import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LanguageContext } from "../Languages/LanguageContext";

const icons = [
  { icon: "telegram", href: "https://t.me/Fetan_M" },
  {
    icon: "twitter",
    href: "https://x.com/fetanmarket?s=21&t=gHxDPS3W0ySach3Jn8OzKQ",
  },
  {
    icon: "facebook",
    href: "https://www.facebook.com/share/1AFA8B4wWQ/?mibextid=LQQJ4d",
  },
  {
    icon: "whatsapp",
    href: "https://wa.me/251985229218?text=Hi%2C%20we%20at%20Fetan%20Market%20are%20happy%20to%20hear%20from%20you.%20How%20can%20we%20be%20of%20service%3F",
  },
  {
    icon: "instagram",
    href: "https://www.instagram.com/fetan.market?igsh=eTNqamI4b2JpNWxi&utm_source=qr",
  },
  {
    icon: "tiktok",
    href: "https://www.tiktok.com/@fetan.market?_t=ZM-8zmJXofXWqO&_r=1",
  },
  { icon: "linkedin" },
];
const Footer = () => {
  const { t } = useContext(LanguageContext);

  return (
    <>
      <footer className="text-white pt-5 pb-3 bg-danger">
        <div className="container">
          <div className="gy-4 row">
            {/* Logo + Description */}
            <div className="col-12 col-md-6">
              <Link to="/" className="text-black text-decoration-none fw-bold">
                <div className="text-info fs-5">Fetan Delivery Portal</div>
              </Link>

              <p
                style={{ fontSize: "0.9rem", color: "gray" }}
                className="mt-4 text-success"
              >
                {t.footerDescription}
              </p>
            </div>

            <div className="col-12 col-md-6 mt-5 ">
              <h6
                className="text-info fw-lighter"
                style={{ color: "#f49a3a", fontSize: "22px" }}
              >
                {t.contactDetails}
              </h6>
              <h6 className="text-success" style={{ color: "gray" }}>
                {t.contactText}
              </h6>
              <div class="d-flex flex-column gap-2 text-white">
                <div class="d-flex align-items-center">
                  <div
                    class="bg-light rounded-circle d-flex justify-content-center align-items-center me-2"
                    style={{ width: "30px", height: "30px" }}
                  >
                    <i class="bi bi-geo-alt-fill "></i>
                  </div>
                  <p class="mb-0 fw-semibold text-success">
                    {" "}
                    info@fetanmarket.com
                  </p>
                </div>

                <div class="d-flex align-items-center">
                  <div
                    class="bg-light rounded-circle d-flex justify-content-center align-items-center me-2"
                    style={{ width: "30px", height: "30px" }}
                  >
                    <i class="bi bi-telephone-fill "></i>
                  </div>
                  <p class="mb-0 fw-semibold text-success">+251 9 8522 9218</p>
                </div>
              </div>
            </div>
          </div>

          <hr className="border border-1 border-success" />
          <div className="d-flex justify-content-between align-items-center flex-column flex-md-row">
            <div
              className="text-center mt-3 text-success small"
              style={{
                color: "gray",
              }}
            >
              {t.copyright}
            </div>
            <ul className="d-flex gap-3 mt-3 list-unstyled">
              {icons.map((Icon, i) => (
                <li
                  key={i}
                  className="border-start border-3 border-info bg-light px-2 py-1 rounded shadow-sm position-relative icon-item"
                  style={{ cursor: "pointer" }}
                >
                  <NavLink
                    to={Icon.href}
                    target="_blank"
                    className="d-inline-block"
                  >
                    <i
                      className={`bi bi-${Icon.icon} text-white`}
                      style={{
                        zIndex: 2,
                        transition: "transform 0.3s ease, color 0.3s ease",
                      }}
                    ></i>
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className=" d-flex justify-content-center">
              <div
                className="text-center mt-3  small"
                style={{
                  color: "gray",
                }}
              >
                <NavLink
                  to="/terms-of-service-for-sellers"
                  className="text-success text-decoration-none mx-2"
                  style={{
                    color: "gray",
                  }}
                >
                  {t.termsSellers}
                </NavLink>
              </div>

              <div
                className="text-center mt-3  small"
                style={{
                  color: "gray",
                }}
              >
                <NavLink
                  to="/terms-of-service-for-buyers"
                  className=" text-success text-decoration-none mx-2"
                  style={{
                    color: "gray",
                  }}
                >
                  {t.termsBuyers}
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
