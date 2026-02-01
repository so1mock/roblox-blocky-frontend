export interface PlaceSummary {
  uuid: string;
  name: string;
  description: string;
  ownerName: string;
  mainImageUrl: string | undefined;
  lastModifiedAt: string;
  createdAt: string;
}
