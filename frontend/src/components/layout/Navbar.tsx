import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
  const [dark, setDark] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      if (!dark) setDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      if (dark) setDark(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  function toggleDark() {
    const isDark = document.documentElement.classList.contains("dark");

    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDark(true);
    }
  }

  return (
    <header className="w-full h-16 bg-white dark:bg-[#1a1a1a] backdrop-blur border-b flex items-center justify-between px-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Dashboard
      </h2>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleDark}
          className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition"
        >
          {dark ? "Light Mode" : "Dark Mode"}
        </button>

        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
