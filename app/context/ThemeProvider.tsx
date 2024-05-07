"use client"

import { configureWeb3Modal } from "@/connection";
import { createContext, useContext, useState } from "react";
import { Theme } from "@radix-ui/themes";

const ThemeContext = createContext({ theme: "dark", toggleTheme: () => {} });

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }:any) => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "cupcake" : "dark"));
  };

  configureWeb3Modal();

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Theme>
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
      </Theme>
    </ThemeContext.Provider>
  );
};
