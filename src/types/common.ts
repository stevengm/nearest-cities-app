export type QueryError = {
  message: string;
};

export type City = {
  country: string;
  name: string;
  lat: string;
  lng: string;
};

export interface NearestCitiesContextType {
  cities: City[];
  findNearestCities: (
    userLat: string,
    userLng: string,
    limit: number
  ) => City[];
}