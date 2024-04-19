import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

let isLoading: boolean = false;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let error: any = null;

const mockedConfig = {
  GOOGLE_API_KEY: "api key",
};

const mockedCities = [
  {
    country: "US",
    name: "Bay Minette",
    lat: "30.88296",
    lng: "-87.77305",
  },
  {
    country: "US",
    name: "Edna",
    lat: "28.97859",
    lng: "-96.64609",
  },
  {
    country: "US",
    name: "Bayou La Batre",
    lat: "30.40352",
    lng: "-88.24852",
  },
  {
    country: "US",
    name: "Henderson",
    lat: "32.15322",
    lng: "-94.79938",
  },
];

vi.mock("@vis.gl/react-google-maps", () => ({
  APIProvider: vi.fn(({ children }) => children),
  Map: vi.fn(),
  AdvancedMarker: vi.fn(),
  Pin: vi.fn(),
}));

vi.mock("./config", () => ({
  config: mockedConfig,
}));

vi.mock("./hooks/useNearestCities", () => ({
  useNearestCities: () => ({
    filterNearestCities: vi.fn().mockReturnValue(mockedCities),
    getCityByName: vi.fn(),
    getCitiesByName: vi.fn(),
    isLoading: isLoading,
    error: error,
  }),
}));

const renderApp = () => {
  render(
      <App />
  );
};

describe("App Component Tests", () => {
  beforeEach(() => {
    isLoading = false;
    error = null;
  });
  
  test("renders loading message when data is loading", async () => {
    isLoading = true;
    renderApp();
    const loadingElement = screen.getByText(/loading/i);
    expect(loadingElement).toBeInTheDocument();
  });

  test("renders error message when there is an error", async () => {
    error = { message: "error" };
    renderApp();
    const errorElement = screen.getByText(/error/i);
    expect(errorElement).toBeInTheDocument();
  });

  test("renders city input and nearest cities list", async () => {
    renderApp();
    const cityInput = screen.getByPlaceholderText(/enter a city name/i);
    expect(cityInput).toBeInTheDocument();
    const nearestCitiesElement = screen.getByText(/Nearest Cities:/i);
    expect(nearestCitiesElement).toBeInTheDocument();
  });

  test("search functionality updates search term", async () => {
    renderApp();
    const cityInput = screen.getByPlaceholderText(/enter a city name/i);
    fireEvent.change(cityInput, { target: { value: "New York" } });
    expect(cityInput).toHaveValue("New York");
  });
});
