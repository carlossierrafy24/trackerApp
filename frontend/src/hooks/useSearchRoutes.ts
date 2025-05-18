import { useState } from "react";

interface RouteParams {
  from_city: string;
  to_city: string;
}

interface Carrier {
  name: string;
  trucks_per_day: number;
}

interface RouteResponse {
  resultCode: string;
  resultMessage: string;
  data: Carrier[];
  totalCarriers: number;
}

export const useSearchRoutes = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [carriers, setCarriers] = useState<Carrier[]>([]);
  const [totalCarriers, setTotalCarriers] = useState<number>(0);

  const searchRoute = async ({ from_city, to_city }: RouteParams) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(import.meta.env.VITE_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ from_city, to_city }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data: RouteResponse = await response.json();

      if (data.resultCode !== "0000") {
        throw new Error(
          data.resultMessage || "Unexpected response from server"
        );
      }

      setCarriers(data.data);
      setTotalCarriers(data.totalCarriers);
    } catch (err: any) {
      setError(err.message || "Unknown error");
      setCarriers([]);
      setTotalCarriers(0);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setLoading(false);
    setError(null);
    setCarriers([]);
    setTotalCarriers(0);
  };

  return {
    loading,
    error,
    carriers,
    totalCarriers,
    searchRoute,
    reset,
  };
};
