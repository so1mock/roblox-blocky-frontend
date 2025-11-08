import { useState } from "react";

interface AlertConfig {
  title?: string;
  message: string;
  type?: "info" | "success" | "error" | "warning";
}

export function useAlertModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<AlertConfig>({
    message: "",
    type: "info",
  });

  const showAlert = (alertConfig: AlertConfig) => {
    setConfig(alertConfig);
    setIsOpen(true);
  };

  const closeAlert = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    config,
    showAlert,
    closeAlert,
  };
}
