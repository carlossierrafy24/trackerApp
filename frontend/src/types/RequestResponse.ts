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
