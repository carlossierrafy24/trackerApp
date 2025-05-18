export interface Carrier {
  name: string;
  trucks_per_day: number;
}

export interface State {
  loading: boolean;
  error: string | null;
  carriers: Carrier[];
  totalCarriers: number;
}

export type Action =
  | { type: "FETCH" }
  | { type: "SUCCESS"; payload: { carriers: Carrier[]; totalCarriers: number } }
  | { type: "ERROR"; payload: string }
  | { type: "RESET" };

export const initialState: State = {
  loading: false,
  error: null,
  carriers: [],
  totalCarriers: 0,
};

export interface RouteParams {
  from_city: string;
  to_city: string;
}

export interface RouteResponse {
  resultCode: string;
  resultMessage: string;
  data: Carrier[];
  totalCarriers: number;
}

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
