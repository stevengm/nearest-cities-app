import { useMemo } from "react";
import { useQuery } from "react-query";
import { CalculateDistance } from "../utils/helpers";
import { City, QueryError } from "../types/common";

interface NearestCitiesHookResult {
  filterNearestCities: (searchTerm: string) => City[];
  citiesData: City[] | undefined;
  getCitiesByName: (searchTerm: string) => City[] | undefined;
  isLoading: boolean;
  error: QueryError | null;
}

export const useNearestCities = (): NearestCitiesHookResult => {
  const {
    data: citiesData,
    isLoading,
    error,
  }: {
    data: City[] | undefined;
    isLoading: boolean;
    error: QueryError | null;
  } = useQuery("cities", async () => {
    const response = await fetch("/cities.json");
    if (!response.ok) {
      throw new Error("Failed to fetch cities data");
    }
    const jsonData = await response.json();
    return jsonData as City[]; // Ensure type safety by casting the response to City[]
  });

  const filterNearestCities = useMemo(() => {
    return (searchTerm: string): City[] => {
      if (!citiesData) return [];

      // Filter cities by search term
      let matchedCity: City | undefined = undefined;
      if (searchTerm) {
        matchedCity = citiesData.find((city) =>
          city.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (!matchedCity) return [];

      // Calculate distances for all cities from the matched city
      const citiesWithDistances = citiesData.map((city) => ({
        ...city,
        distance: CalculateDistance(
          matchedCity?.lat || "",
          matchedCity?.lng || "",
          city.lat,
          city.lng
        ),
      }));

      // Sort cities by distance
      citiesWithDistances.sort((a, b) => a.distance - b.distance);

      // Return nearest cities (excluding the matched city itself)
      return citiesWithDistances.slice(1, 5);
    };
  }, [citiesData]);

  const getCitiesByName = useMemo(() => {
    return (searchTerm: string): City[] => {
      if (!citiesData || !searchTerm) return [];
      return citiesData.filter((city) =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    };
  }, [citiesData]);

  return {
    filterNearestCities,
    citiesData,
    getCitiesByName,
    isLoading,
    error,
  };
};
