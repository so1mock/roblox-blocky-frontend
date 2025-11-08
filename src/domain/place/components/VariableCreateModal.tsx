import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";

interface VariableCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (variableName: string) => void;
}

// 앱 루트 엘리먼트 설정 (접근성을 위해 필요)
if (typeof window !== "undefined") {
  Modal.setAppElement("#root");
}

function VariableCreateModal({
  isOpen,
  onClose,
  onConfirm,
}: VariableCreateModalProps) {
  const [variableName, setVariableName] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setVariableName("");
      setError("");
      // 모달이 열리면 input에 자동 포커스
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = variableName.trim();

    if (!trimmedName) {
      setError("변수 이름을 입력해주세요");
      return;
    }

    // 변수명 유효성 검사 (영문, 숫자, 언더스코어만 허용)
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(trimmedName)) {
      setError(
        "변수 이름은 영문자, 숫자, 언더스코어만 사용 가능하며 숫자로 시작할 수 없습니다",
      );
      return;
    }

    onConfirm(trimmedName);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white rounded-2xl shadow-lg max-w-2xl w-full mx-auto mt-32 p-6 outline-none relative"
      overlayClassName="fixed inset-0 bg-black/50 flex items-start justify-center z-100"
    >
      {/* 헤더 */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">새 변수 만들기</h2>
      </div>

      {/* 본문 */}
      <form onSubmit={handleSubmit}>
        <div className="px-6 py-4">
          <label
            htmlFor="variableName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            변수 이름
          </label>
          <input
            ref={inputRef}
            id="variableName"
            type="text"
            value={variableName}
            onChange={(e) => {
              setVariableName(e.target.value);
              setError("");
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="예: myVariable"
          />
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          <p className="mt-2 text-xs text-gray-500">
            영문자, 숫자, 언더스코어(_)를 사용할 수 있습니다
          </p>
        </div>

        {/* 푸터 */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            취소
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            생성
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default VariableCreateModal;
