import { useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { useSearchRoutes } from "../hooks/useSearchRoutes";
import Results from "./Results";
import { GoogleMapsComponent } from "./GoogleMaps";

export interface Carrier {
  name: string;
  trucks_per_day: number;
}

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
      .replace(/\.-(){}[]'"<>/g, "")
      .trim();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Autocomplete
          onLoad={(autocomplete) => (fromAutocomplete.current = autocomplete)}
          options={{ types: ["(cities)"] }}
        >
          <input ref={fromRef} placeholder="From city" />
        </Autocomplete>

        <Autocomplete
          onLoad={(autocomplete) => (toAutocomplete.current = autocomplete)}
          options={{ types: ["(cities)"] }}
        >
          <input ref={toRef} placeholder="To city" />
        </Autocomplete>

        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {carriers.length > 0 && !loading && (
        <div>
          <h2>Carriers Found: {totalCarriers}</h2>
          <Results carriers={carriers} />
          <button onClick={reset}>Reset</button>
          <GoogleMapsComponent
            origin={fromRef.current?.value || ""}
            destination={toRef.current?.value || ""}
          />
        </div>
      )}
    </div>
  );
};
