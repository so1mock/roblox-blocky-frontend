export interface Place {
  uuid: string;
  name: string;
  description: string;
  ownerName: string;
  lastModifiedAt: string;
}

export interface PlacesResponse {
  places: Place[];
}
