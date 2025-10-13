import React, { createContext, useState, useEffect } from "react";
import translation from "./translation.json";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const defaultLang = localStorage.getItem("appLang") || "English";
  const [language, setLanguage] = useState(defaultLang);
  const [t, setT] = useState(translation[defaultLang]);

  useEffect(() => {
    setT(translation[language]);
    localStorage.setItem("appLang", language);
  }, [language]);

  const changeLanguage = (lang) => {
    if (translation[lang]) {
      setLanguage(lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ t, language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
