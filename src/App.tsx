import { ChangeEvent, useState, useMemo } from "react";
import { useNearestCities } from "./hooks/useNearestCities";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import "./App.scss";
import { City } from "./types/common";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { filterNearestCities, getCitiesByName, citiesData, isLoading, error } =
    useNearestCities();

  const nearestCities = filterNearestCities(searchTerm);
  const cities = citiesData;
  const lookupCities = getCitiesByName(searchTerm);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const nearCities = useMemo(() => {
    return nearestCities.map((city: City, index: number) => (
      <li key={index} className="mb-1">
        {city.name}
      </li>
    ));
  }, [nearestCities]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-blue-500 py-4">
        <h1 className="text-white text-center text-2xl">Find Nearest Cities</h1>
      </header>
      <main className="flex-grow flex items-center justify-center">
        <div className="flex flex-col items-center p-4 bg-gray-200 w-full h-full">
          <label htmlFor="cityInput" className="sr-only">
            Search for cities:
          </label>
          <input
            id="cityInput"
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            autoComplete="off"
            placeholder="Enter a city name..."
            className="w-full border-gray-300 p-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            list="cityList"
          />
          {!!lookupCities?.length && (
            <div className="absolute top-32 right-4 w-56 p-2 bg-white rounded-md shadow-md">
              <FixedSizeList
                height={150} // Adjust the height as needed
                itemCount={lookupCities?.length || 0}
                itemSize={30} // Adjust the item size as needed
                width={"100%"}
                className="overflow-scroll"
              >
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {({ index, style }: { index: number; style: any }) => (
                  <ul style={style}>
                    <li className="mb-1">
                      {lookupCities && lookupCities[index].name}
                    </li>
                  </ul>
                )}
              </FixedSizeList>
            </div>
          )}
          {nearestCities?.length > 0 && (
            <div className="ml-4 mt-4 w-full h-full">
              <h2 className="text-lg font-bold mb-2">Nearest Cities:</h2>
              <ul className="list-decimal flex flex-col items-start">
                {nearCities}
              </ul>
            </div>
          )}
          {!searchTerm && cities && (
            <div className="ml-4 mt-4 w-full h-full">
              <h2 className="text-lg font-bold mb-2">All Cities:</h2>
              <AutoSizer>
                {({ height, width }) => (
                  <FixedSizeList
                    height={height - 40} // Adjust the height as needed
                    itemCount={cities?.length}
                    itemSize={30} // Adjust the item size as needed
                    width={width}
                  >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {({ index, style }: { index: number; style: any }) => (
                      <div style={style}>
                        <li className="mb-1">{cities[index].name}</li>
                      </div>
                    )}
                  </FixedSizeList>
                )}
              </AutoSizer>
            </div>
          )}
        </div>
      </main>
      <footer className="bg-blue-500 py-4 text-white text-center">
        <p>&copy; 2024 Nearest Cities App Orbidi Test</p>
      </footer>
    </div>
  );
};

export default App;
