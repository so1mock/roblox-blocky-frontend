import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "react-modal";
import { variableSchema, type VariableForm } from "@place/constants/schema";

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
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<VariableForm>({
    resolver: zodResolver(variableSchema),
    defaultValues: { name: "" },
  });

  useEffect(() => {
    if (!isOpen) return;
    reset();
    // 모달이 열리면 input 에 자동 포커스
    setTimeout(() => setFocus("name"), 100);
  }, [isOpen, reset, setFocus]);

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
      <form onSubmit={handleSubmit(({ name }) => onConfirm(name))}>
        <div className="px-6 py-4">
          <label
            htmlFor="variableName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            변수 이름
          </label>
          <input
            id="variableName"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="예: myVariable"
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
          )}
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
