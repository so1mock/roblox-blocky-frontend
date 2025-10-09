import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";

Modal.setAppElement("#root"); // 접근성 설정

interface PlaceConnectGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function PlaceConnectGuideModal({
  isOpen,
  onClose,
}: PlaceConnectGuideModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white rounded-2xl shadow-lg max-w-2xl w-full mx-auto mt-32 p-6 outline-none relative"
      overlayClassName="fixed inset-0 bg-black/50 flex items-start justify-center z-50"
    >
      {/* 닫기 버튼 */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-black transition"
      >
        <AiOutlineClose className="w-6 h-6" />
      </button>

      {/* 제목 */}
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        새 플레이스 연결 방법
      </h2>

      {/* 설명 텍스트 */}
      <p className="text-gray-600 mb-6 leading-relaxed">
        아래 영상을 통해 새로운 플레이스를 연결하는 과정을 단계별로 확인하세요.
      </p>

      {/* 안내 영상 */}
      <div className="w-full aspect-video rounded-xl overflow-hidden shadow-md mb-6">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/uzJrc3FsDr8?autoplay=0&mute=0&rel=0&modestbranding=1"
          title="새 플레이스 연결 방법 안내 영상"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* 닫기 버튼 */}
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-rbPrimaryColor hover:bg-rbDeepPrimaryColor text-white font-medium transition cursor-pointer"
        >
          닫기
        </button>
      </div>
    </Modal>
  );
}

export default PlaceConnectGuideModal;
