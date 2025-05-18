from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict, Tuple, Any
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:5173",  # Vite
    "http://localhost:3000",  # React por defecto
    'https://home-take-trackerapp.web.app', # Firebase Hosting
    'https://home-take-trackerapp.firebaseapp.com', # Firebase Hosting
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock data for available routes
ROUTES: Dict[Tuple[str, str], List[Dict[str, Any]]] = {
    ("New York", "Washington DC"): [
        {"name": "Knight-Swift Transport Services", "trucks_per_day": 10},
        {"name": "J.B. Hunt Transport Services Inc", "trucks_per_day": 7},
        {"name": "YRC Worldwide", "trucks_per_day": 5},
    ],
    ("San Francisco", "Los Angeles"): [
        {"name": "XPO Logistics", "trucks_per_day": 9},
        {"name": "Schneider", "trucks_per_day": 6},
        {"name": "Landstar Systems", "trucks_per_day": 2},
    ],
    ("origin", "destination"): [
        {"name": "UPS Inc.", "trucks_per_day": 11},
        {"name": "FedEx Corp", "trucks_per_day": 9},
    ],
}

class RouteRequest(BaseModel):
    from_city: str
    to_city: str

@app.post("/routes", response_model=List[Dict[str, Any]])
def get_routes(req: RouteRequest):
    try:
        # Validate input cities - not equals and not empty
        if not req.from_city or not req.to_city:
            return JSONResponse(
                status_code=400,
                content={
                    "resultCode": "0001",
                    "resultMessage": "Origin and destination cannot be empty",
                    "data": [],
                    "totalCarriers": 0
                }
            )
        if req.from_city == req.to_city:
            return JSONResponse(
                status_code=400,
                content={
                    "resultCode": "0001",
                    "resultMessage": "Origin and destination must be different",
                    "data": [],
                    "totalCarriers": 0
                }
            )

        # origin - destination
        route_pair = (req.from_city.strip(), req.to_city.strip())
        route_pair_inverted = (route_pair[1], route_pair[0])
        if route_pair in ROUTES:
            carriers = ROUTES[route_pair]
            result_message = "Success"
        elif route_pair_inverted in ROUTES:
            carriers = ROUTES[route_pair_inverted]
            result_message = "Success"
        else:
            # default route
            route_pair = ("origin", "destination")
            carriers = ROUTES.get(route_pair, [])
            result_message = "No specific route found, using default route"

        return JSONResponse(
            status_code=200,
            content={
                "resultCode": "0000",
                "resultMessage": result_message,
                "data": carriers,
                "totalCarriers": len(carriers)
            }
        )
    except Exception:
        return JSONResponse(
            status_code=500,
            content={
                "resultCode": "9999",
                "resultMessage": "Internal Server Error: {null}",
                "data": [],
                "totalCarriers": 0
            }
        )