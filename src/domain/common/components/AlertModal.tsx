import Modal from "react-modal";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  type?: "info" | "success" | "error" | "warning";
}

// 앱 루트 엘리먼트 설정 (접근성을 위해 필요)
if (typeof window !== "undefined") {
  Modal.setAppElement("#root");
}

function AlertModal({
  isOpen,
  onClose,
  title,
  message,
  type = "info",
}: AlertModalProps) {
  // 타입별 아이콘과 색상
  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return {
          icon: "✓",
          iconBg: "bg-green-100",
          iconColor: "text-green-600",
          buttonBg: "bg-green-600 hover:bg-green-700",
        };
      case "error":
        return {
          icon: "✕",
          iconBg: "bg-red-100",
          iconColor: "text-red-600",
          buttonBg: "bg-red-600 hover:bg-red-700",
        };
      case "warning":
        return {
          icon: "⚠",
          iconBg: "bg-yellow-100",
          iconColor: "text-yellow-600",
          buttonBg: "bg-yellow-600 hover:bg-yellow-700",
        };
      default:
        return {
          icon: "ℹ",
          iconBg: "bg-blue-100",
          iconColor: "text-blue-600",
          buttonBg: "bg-blue-600 hover:bg-blue-700",
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white rounded-2xl shadow-lg max-w-2xl w-full mx-auto mt-32 p-6 outline-none relative"
      overlayClassName="fixed inset-0 bg-black/50 flex items-start justify-center z-100"
      closeTimeoutMS={200}
    >
      <div className="p-6">
        {/* 아이콘 */}
        <div className="flex justify-center mb-4">
          <div
            className={`w-12 h-12 rounded-full ${styles.iconBg} flex items-center justify-center`}
          >
            <span className={`text-2xl ${styles.iconColor}`}>
              {styles.icon}
            </span>
          </div>
        </div>

        {/* 타이틀 */}
        {title && (
          <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
            {title}
          </h3>
        )}

        {/* 메시지 */}
        <p className="text-sm text-gray-600 text-center mb-6">{message}</p>

        {/* 확인 버튼 */}
        <button
          onClick={onClose}
          className={`w-full px-4 py-2 text-sm font-medium text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer ${styles.buttonBg}`}
        >
          확인
        </button>
      </div>
    </Modal>
  );
}

export default AlertModal;
