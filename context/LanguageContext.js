"use client"
import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en'); 

  const switchLanguage = (newLang) => {
    setLang(newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);