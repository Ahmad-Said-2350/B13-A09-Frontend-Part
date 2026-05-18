"use client";
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const saved = localStorage.getItem("ideavault-theme") || "light";
    setTheme(saved);
    applyTheme(saved);
  }, []);

  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
   
  }

function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    console.log(next)
    setTheme(next);
    applyTheme(next);
    localStorage.setItem("ideavault-theme", next);
  }

  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div className="invisible">{children}</div>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}