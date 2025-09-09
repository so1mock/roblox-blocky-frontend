import type { ObjectType } from "../types/object";

export const getIcon = (type: ObjectType): string => {
  switch (type) {
    case "Script":
      return "📄";
    case "LocalScript":
      return "📑";
    case "Part":
      return "🧱";
    case "Workspace":
      return "🏠";
    case "Model":
      return "🧩";
    case "Folder":
      return "📁";
    default:
      return "❓";
  }
};
