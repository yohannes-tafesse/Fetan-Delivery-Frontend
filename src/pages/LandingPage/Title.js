import React, { useContext } from "react";
import { LanguageContext } from "../Languages/LanguageContext";

const Title = ({ data }) => {
      const { t } = useContext(LanguageContext);
  
  return (
    <div className="container text-center py-2  ">
      {data.map((item, index) => (
        <div className="mb-5" key={index}>
          <h2 className="fw-bold display-6 text-light mb-3">{t[item.title]}</h2>

          <div
            className="mx-auto mb-4 bg-light"
            style={{
              height: "4px",
              width: "100px",
              borderRadius: "4px",
            }}
          ></div>

          <p className=" mx-auto text-gray" style={{ maxWidth: "600px" }}>
            {t[item.description]}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Title;
