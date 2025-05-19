# TrackerApp

This document includes the architecture and main components of the TrackerApp logistics route-tracking platform

## 2. System Overview

| Browser ↔️ Frontend (React.js) ↔️ Backend (FastAPI) |

### Frontend

- Key Components:

  - Main Form:
    - Inputs: From City, To City (with Google Places Autocomplete)
    - Submits cities to backend API.
  - Google Maps Integration:
    - Embedded map showing the driving route between the selected cities.
    - Uses @react-google-maps/api for rendering directions.
  - Results Panel:
    - Displays the list of transport carriers that operate on the selected route.
  - API Communication:
    - Uses fetch or axios to communicate with the backend.
    - Sends a POST request with JSON payload:
  - City Geocoding:
    - Uses Google Maps Places API to validate city inputs.

### Final structure

```bash
.
├── eslint.config.js
├── firebase.json
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── assets
│   │   └── react.svg
│   ├── components
│   │   ├── CityForm.tsx
│   │   ├── Components.css
│   │   ├── GoogleMaps.tsx
│   │   ├── Header.tsx
│   │   └── Results.tsx
│   ├── hooks
│   │   └── useSearchRoutes.ts
│   ├── index.css
│   ├── main.tsx
│   ├── pages
│   │   ├── Home.tsx
│   │   └── Pages.css
│   ├── reducers
│   │   └── searchRoutesReducer.ts
│   ├── types
│   │   └── RequestResponse.ts
│   └── vite-env.d.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts

8 directories, 26 files
```

### Backend (FastAPI)

### Base endponit

```bash
POST /routes
```

### Request body

```bash
{
  "from_city": "<origin>",
  "to_city": "<destination>"
}
```

### Logic

- Matches the origin and destination against a predefined list of known routes.
- Returns available carriers (mocked or from a data source) operating between those cities.

### Response example

```bash
{
  "resultCode": "0000",
  "resultMessage": "Success",
  "data": [
    {"name": "Knight-Swift Transport Services", "trucks_per_day": 10 },
    {"name": "J.B. Hunt Transport Services Inc", "trucks_per_day": 7 }
  ],
  "totalCarriers": 2
}
```

### General Flow

- The user selects origin and destination cities from the form.
- Google Maps API suggests valid city names (autocomplete).
- The cities are sent to the backend via POST /routes.
- The backend returns a list of predefined carriers for the route.
- The app requests driving directions and displays the route on the map.
- The frontend renders the carrier list alongside the map.

## 3. Database design

The schema is designed to manage logistics data, focusing on cities, carriers (transport companies), routes between cities, and how carriers operate on those routes.

### Schema

```bash
magiclogs
│
├── cities
├── carriers
├── routes
└── carrier_routes
```

### Tables

Cities

```bash
cities
│
├── id
├── name
├── country
├── latitude
└── longitude
```

Carriers

```bash
carriers
│
├── id
├── name
└── trucks_per_day
```

Routes

```bash
routes
│
├── id
├── from_city
└── to_city
```

CarrierRoutes

```bash
carrier_routes
│
├── carrier_id
├── route_id
└── trucks_per_day
```

## Improvements Made During Development

1. Migration from JavaScript to TypeScript (frontend)
2. Separation of State Logic using useReducer (frontend)
3. Backend error handling

## Future Improvements

- Authentication layer for users or dispatchers.
- Dynamic carrier database with real-time availability.
- Improve project structure using hexagonal architecture
- Improved error handling and input validation.
- Add cost/time estimates based on route data.
- Add the function to select a carrier for more information
- Add a marker on the map to the selected carrier
