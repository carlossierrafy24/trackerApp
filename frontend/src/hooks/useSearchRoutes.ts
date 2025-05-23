import { useReducer } from "react";
import { searchRoutesReducer } from "../reducers/searchRoutesReducer";
import {
  initialState,
  type RouteParams,
  type RouteResponse,
} from "../types/RequestResponse";

export const useSearchRoutes = () => {
  const [state, dispatch] = useReducer(searchRoutesReducer, initialState);

  const searchRoute = async ({ from_city, to_city }: RouteParams) => {
    dispatch({ type: "FETCH" });

    try {
      const response = await fetch(import.meta.env.VITE_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ from_city, to_city }),
      });

      if (!response.ok) {
        throw new Error("Check the data and try again");
      }

      const data: RouteResponse = await response.json();

      if (data.resultCode !== "0000") {
        throw new Error(data.resultMessage || "Unexpected server response");
      }

      dispatch({
        type: "SUCCESS",
        payload: { carriers: data.data, totalCarriers: data.totalCarriers },
      });
    } catch (error: any) {
      dispatch({ type: "ERROR", payload: error.message || "Unknown error" });
    }
  };

  return {
    ...state,
    searchRoute,
    reset: () => dispatch({ type: "RESET" }),
  };
};
