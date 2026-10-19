import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const current =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "dark"
        : "light";
    setTheme(current);
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("dani-academy-theme", next);
    } catch {
      // Ignore storage errors
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Cambiar tema claro u oscuro"
      className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-surface-2 bg-surface px-3 py-1.5 font-sans text-xs font-medium text-fg transition hover:border-accent"
    >
      <span>{theme === "dark" ? "Modo claro" : "Modo oscuro"}</span>
    </button>
  );
}
