import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { PlaceCard } from "@place/components/PlaceCard";
import { placeApi } from "@place/apis/place";
import type { Place } from "@place/types/place";
import { useAuthStore } from "@user/stores/authStore";

export function PlaceList() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { isLogin } = useAuthStore();

  useEffect(() => {
    if (isLogin === true) {
      loadPlaces();
    } else if (isLogin === false) {
      // 비로그인 시 로딩을 멈추고 안내 문구 표시
      setLoading(false);
    }
  }, [isLogin]);

  const loadPlaces = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await placeApi.getMyPlaces();
      setPlaces(response.places);
    } catch (err) {
      setError('플레이스 목록을 불러오는데 실패했습니다.');
      console.error('Failed to load places:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (place: Place) => {
    // 프로젝트 편집 페이지로 이동
    navigate({ to: "/project/$placeId", params: { placeId: place.uuid } });
  };

  const handleDelete = (placeUuid: string) => {
    // TODO: 삭제 기능 구현
    console.log('Delete place:', placeUuid);
  };

  if (isLogin === false) {
    return (
      <div className="text-center py-12 text-gray-700">
        플레이스 목록을 불러오려면 로그인 해주세요
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">플레이스 목록을 불러오는 중...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">{error}</div>
        <button
          onClick={loadPlaces}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
        >
          다시 시도
        </button>
      </div>
    );
  }

  if (places.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">플레이스가 없습니다</h3>
        <p className="text-gray-500 mb-4">새로운 플레이스를 만들어보세요!</p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200">
          새 플레이스 만들기
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">내 플레이스</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {places.map((place) => (
          <PlaceCard
            key={place.uuid}
            place={place}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
