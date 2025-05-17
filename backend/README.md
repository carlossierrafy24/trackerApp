# trackerApp

Simple project based in **FastAPI** to simulate request to a backend service, the system return a list of carriers from a specific route between two cities, the carriers are mocked in a dictionary.

---

## Features

- RESTful API built with FastAPI
- Request validation using Pydantic
- Structured JSON responses
- Proper HTTP status codes and error handling
- Mock dataset simulating real-world logistics

---

## Installation

1. **Clone the repository:**

```bash
git clone ...
```

2. **Create virtual environment:**

```bash
python3 -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
```

3. **Install dependencies:**

```bash
pip install fastapi uvicorn
```

4. **Run the project:**

```bash
uvicorn main:app --reload
```

5. **The API will be available at:** [http://127.0.0.1:8000](http://127.0.0.1:8000)

## Fetching data

### Local endpoint

```bash
http://127.0.0.1:8000/routes
```

### Remote endpoint

```bash
https://trackerapp-j7k7.onrender.com/routes
```

### Request body

```bash
{
  "from_city": "X",
  "to_city": "Y"
}

```

### Success response (mocked)

```bash
{
  "resultCode": "0000",
  "resultMessage": "Success",
  "data": [
    {
      "name": "XYZ Transport Services",
      "trucks_per_day": 10
    },
    {
      "name": "ABC Transport Services Inc",
      "trucks_per_day": 7
    },
    {
      "name": "123 Worldwide",
      "trucks_per_day": 5
    }
  ],
  "totalCarriers": 3
}
```

### No data response

```bash
{
    "resultCode": "0000",
    "resultMessage": "No data found for route from X to Y. Default data returned.",
    "data": [
        {
            "name": "UPS Inc.",
            "trucks_per_day": 11
        },
        {
            "name": "FedEx Corp",
            "trucks_per_day": 9
        }
    ],
    "totalCarriers": 2
}
```

### Server error response

```bash
{
  "resultCode": "9999",
  "resultMessage": "Internal Server Error: error description",
  "data": [],
  "totalCarriers": 0
}

```
