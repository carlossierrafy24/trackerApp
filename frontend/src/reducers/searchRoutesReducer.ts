import {
  initialState,
  type Action,
  type State,
} from "../types/RequestResponse";

export const searchRoutesReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "FETCH":
      return { ...state, loading: true, error: null };
    case "SUCCESS":
      return {
        loading: false,
        error: null,
        carriers: action.payload.carriers,
        totalCarriers: action.payload.totalCarriers,
      };
    case "ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
        carriers: [],
        totalCarriers: 0,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};
