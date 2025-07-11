import { useState, useEffect } from "react";
import '../styles/toggle.css'; // тот самый переведённый CSS

const ToggleBtn = () => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
      <div className=" top-4 left-4 z-50">
        <label className="switch">
          <input
              type="checkbox"
              checked={isDark}
              onChange={() => setIsDark(!isDark)}
          />
          <span className="slider round"></span>
        </label>
      </div>
  );
};

export default ToggleBtn;
