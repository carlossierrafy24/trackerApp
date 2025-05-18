import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import Results from "./Results";
interface Props {
  origin: google.maps.LatLng | google.maps.LatLngLiteral | string;
  destination: google.maps.LatLng | google.maps.LatLngLiteral | string;
  carriers: { name: string; trucks_per_day: number }[];
}

export const GoogleMapsComponent = ({
  origin,
  destination,
  carriers,
}: Props) => {
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  useEffect(() => {
    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
        } else {
          console.error("Error getting route:", status);
        }
      }
    );
  }, [origin, destination]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "600px",
        borderRadius: "0px 0px 8px 8px",
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.25)",
      }}
    >
      <GoogleMap
        center={{ lat: 39.8283, lng: -98.5795 }}
        zoom={5}
        mapContainerStyle={{ width: "100%", height: "100%" }}
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
      <Results carriers={carriers} total={carriers.length} />
    </div>
  );
};
