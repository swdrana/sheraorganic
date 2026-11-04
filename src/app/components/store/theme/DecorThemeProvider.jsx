"use client";

import { createContext, useContext } from "react";
import { normalizeTheme } from "@/app/utils/theme";

const DecorThemeContext = createContext("grocery");

export default function DecorThemeProvider({ theme, children }) {
  return (
    <DecorThemeContext.Provider value={normalizeTheme(theme)}>
      {children}
    </DecorThemeContext.Provider>
  );
}

export function useDecorTheme() {
  return useContext(DecorThemeContext);
}
