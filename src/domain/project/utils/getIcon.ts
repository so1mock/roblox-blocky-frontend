import type { IconType } from "../types/icon";

export const getIcon = (type: IconType): string => {
  switch (type) {
    case "script":
      return "📄";
    case "part":
      return "🧱";
    case "workspace":
      return "🏠";
    case "openFolder":
      return "📂";
    case "closedFolder":
      return "📁";
    default:
      return "📄";
  }
};
