import type { Place } from "@place/types/place";

interface PlaceCardProps {
  place: Place;
  onEdit?: (place: Place) => void;
  onDelete?: (placeUuid: string) => void;
}

export function PlaceCard({ place, onEdit, onDelete }: PlaceCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border border-gray-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 truncate">
            {place.name}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {place.description}
          </p>
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-500">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="font-medium">소유자:</span>
          <span className="ml-1">{place.ownerName}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium">최종 수정:</span>
          <span className="ml-1">{formatDate(place.lastModifiedAt)}</span>
        </div>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => onEdit?.(place)}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 text-sm"
        >
          편집
        </button>
        <button
          onClick={() => onDelete?.(place.uuid)}
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 text-sm"
        >
          삭제
        </button>
      </div>
    </div>
  );
}
