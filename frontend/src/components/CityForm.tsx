import { useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { useSearchRoutes } from "../hooks/useSearchRoutes";
import { GoogleMapsComponent } from "./GoogleMaps";
import "./Components.css"; // Assuming you have a CSS file for styling

export const CityForm = () => {
  const fromRef = useRef<HTMLInputElement | null>(null);
  const toRef = useRef<HTMLInputElement | null>(null);
  const fromAutocomplete = useRef<google.maps.places.Autocomplete | null>(null);
  const toAutocomplete = useRef<google.maps.places.Autocomplete | null>(null);

  const { loading, error, carriers, totalCarriers, searchRoute, reset } =
    useSearchRoutes();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fromCity = cleanCityName(fromRef.current?.value || "");
    const toCity = cleanCityName(toRef.current?.value || "");
    if (fromCity && toCity) {
      searchRoute({ from_city: fromCity, to_city: toCity });
    }
  };

  // function to clean city names
  const cleanCityName = (input: string): string => {
    return input
      .split(",")[0]
      .replace(/[.\-{}[\]'"<>]/g, "")
      .trim();
  };

  const resetForm = () => {
    if (fromRef.current) fromRef.current.value = "";
    if (toRef.current) toRef.current.value = "";
    reset();
  };

  return (
    <div className="city-form-container">
      <form onSubmit={handleSubmit} className="city-form">
        <Autocomplete
          onLoad={(autocomplete) => (fromAutocomplete.current = autocomplete)}
          options={{ types: ["(cities)"] }}
        >
          <input ref={fromRef} placeholder="From city" className="city-input" />
        </Autocomplete>

        <Autocomplete
          onLoad={(autocomplete) => (toAutocomplete.current = autocomplete)}
          options={{ types: ["(cities)"] }}
        >
          <input ref={toRef} placeholder="To city" className="city-input" />
        </Autocomplete>

        <button className="search-button" type="submit">
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {carriers.length > 0 && !loading && (
        <div className="map-container">
          <h2 className="results-header">
            Carriers Found: {totalCarriers}
            <button onClick={resetForm} className="reset-button">
              Reset search
            </button>
          </h2>
          <GoogleMapsComponent
            origin={fromRef.current?.value || ""}
            destination={toRef.current?.value || ""}
            carriers={carriers}
          />
        </div>
      )}
    </div>
  );
};
