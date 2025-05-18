import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import { useState, useEffect } from "react";

interface Props {
  origin: string;
  destination: string;
}

export const GoogleMapsComponent = ({ origin, destination }: Props) => {
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
    <GoogleMap
      center={{ lat: 39.8283, lng: -98.5795 }}
      zoom={5}
      mapContainerStyle={{ width: "100%", height: "400px" }}
    >
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
};
