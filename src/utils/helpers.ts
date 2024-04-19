// Constants
const EARTH_RADIUS_KM = 6371;
const DEGREES_TO_RADIANS = Math.PI / 180;

export const CalculateDistance = (
  lat1: string,
  lon1: string,
  lat2: string,
  lon2: string
): number => {
  // Convert string latitudes and longitudes to numbers
  const lat1Num = parseFloat(lat1);
  const lon1Num = parseFloat(lon1);
  const lat2Num = parseFloat(lat2);
  const lon2Num = parseFloat(lon2);

  if (isNaN(lat1Num) || isNaN(lon1Num) || isNaN(lat2Num) || isNaN(lon2Num)) {
    throw new Error("Invalid latitude or longitude values.");
  }

  const deltaLat = (lat2Num - lat1Num) * DEGREES_TO_RADIANS;
  const deltaLon = (lon2Num - lon1Num) * DEGREES_TO_RADIANS;
  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1Num * DEGREES_TO_RADIANS) *
      Math.cos(lat2Num * DEGREES_TO_RADIANS) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);
  const centralAngle = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = EARTH_RADIUS_KM * centralAngle; // Distance in kilometers
  return distance;
};
