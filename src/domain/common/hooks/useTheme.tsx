import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

export const useTheme = (): [Theme, (next: Theme) => void] => {
  const [theme, setTheme] = useState<Theme>(() => {
    const htmlTheme = document.documentElement.getAttribute("data-theme");
    return htmlTheme === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return [theme, setTheme];
};
