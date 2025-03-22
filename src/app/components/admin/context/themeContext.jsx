"use client";

import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const contextValue = {
    darkMode,
    toggleDarkMode,
  };

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}