"use client"

import { createContext, useContext, useState } from "react";

const ThemeContext = createContext({ theme: "dark", toggleTheme: () => {} });

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }:any) => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "cupcake" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div data-theme={theme} className="relative overflow-hidden">
        {theme === "dark" && (
          <div className="absolute inset-0">
            <img
              src={"/hero-background.jpg"}
              className="object-cover w-full h-full"
              alt="hero"
            />
          </div>
        )}
        <div className="relative z-10">{children}</div>
      </div>
    </ThemeContext.Provider>
  );
};
