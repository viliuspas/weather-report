# Weather Report Backend

Backend is made in Node.js with Express.js framework.

## Usage

To install dependencies run:
```bash
npm install
```

To start locally:
```bash
npm start
```
or
```bash
node index.js
```

## Structure

All configurations and routing is in `index.js` file

## Base URL

Local: `http://localhost:3000`

Production:  `https://weather-report-backend-nine.vercel.app`

## Endpoints

<details>

<summary><strong>Health Check</strong></summary>

**Endpoint:** `GET /`

**Description:** Returns a status message indicating the backend service is running.

**Response:**
- **Status Code:** `200 OK`
- **Content-Type:** `application/json`
- **Body:**
  ```json
  "weather-report-backend is running"
  ```

**Error Response:**
- **Status Code:** `500 Internal Server Error`
- **Body:**
  ```json
  {
    "error": "Failed to fetch"
  }
  ```

</details>

<details>
<summary><strong>Get All Places</strong></summary>

**Endpoint:** `GET /places`

**Description:** Retrieves a list of all available places from the meteorological API.

**Response:**
- **Status Code:** `200 OK`
- **Content-Type:** `application/json`
- **Body:**
    ```json
    [{
        "code":"string",
        "name":"string",
        "administrativeDivision":"string",
        "countryCode":"string",
        "coordinates": {
            "latitude": number,
            "longitude": number
        }
    }]
    ```
**Example Response:**
```json
[{
    "code":"abromiskes",
    "name":"Abromiškės",
    "administrativeDivision":"Elektrėnų savivaldybė",
    "countryCode":"LT",
    "coordinates": {
        "latitude":54.7825,
        "longitude":24.71032
    }
}]
```

**Error Response:**
- **Status Code:** `500 Internal Server Error`
- **Body:**
  ```json
  {
    "error": "Failed to fetch places"
  }
  ```

</details>

<details>
<summary><strong>Get Place Forecast</strong></summary>

**Endpoint:** `GET /places/:placeCode`

**Description:** Retrieves the long-term weather forecast for a specific place.

**Path Parameters:**
- `placeCode` (string, required) - The unique code identifier for the place

**Example Request:**
```
GET /places/vilnius
```

**Response:**
- **Status Code:** `200 OK`
- **Content-Type:** `application/json`
- **Body:** 
    ```json
    {
        "place": {
            "code": "vilnius",
            "name": "Vilnius",
            "administrativeDivision": "Vilniaus miesto savivaldybė",
            "country": "Lietuva",
            "countryCode": "LT",
            "coordinates": {
            "latitude": 54.68705,
            "longitude": 25.28291
            }
        },
        "forecastType": "long-term",
        "forecastCreationTimeUtc": "2026-02-04 20:09:38",
        "forecastTimestamps": [
            {
            "forecastTimeUtc": "2026-02-04 20:00:00",
            "airTemperature": -16.1,
            "feelsLikeTemperature": -24.1,
            "windSpeed": 4,
            "windGust": 7,
            "windDirection": 100,
            "cloudCover": 1,
            "seaLevelPressure": 1021,
            "relativeHumidity": 74,
            "totalPrecipitation": 0,
            "conditionCode": "clear"
            },
            ...
        ]
    }
    ```

**Example Response:**
```json
{
    "place": {
        "code": "string",
        "name": "string",
        "administrativeDivision": "string",
        "country": "string",
        "countryCode": "string",
        "coordinates": {
        "latitude": number,
        "longitude": number
        }
    },
    "forecastType": "string",
    "forecastCreationTimeUtc": "string",
    "forecastTimestamps": [
        {
        "forecastTimeUtc": "string",
        "airTemperature": number,
        "feelsLikeTemperature": number,
        "windSpeed": number,
        "windGust": number,
        "windDirection": number,
        "cloudCover": number,
        "seaLevelPressure": number,
        "relativeHumidity": number,
        "totalPrecipitation": number,
        "conditionCode": "string"
        },
        ...
    ]
}
```

**Error Response:**
- **Status Code:** `500 Internal Server Error`
- **Body:**
  ```json
  {
    "error": "Failed to fetch place"
  }
  ```

</details>

<details>
<summary><strong>Log Viewed Place</strong></summary>

**Endpoint:** `POST /places/viewed`

**Description:** Logs when a user views a specific place. This endpoint logs the place code and timestamp to the server console.

**Request Body:**
- **Content-Type:** `application/json`
- **Body:**
  ```json
  {
    "code": "string"
  }
  ```

**Request Body Parameters:**
- `code` (string, required) - The unique code identifier for the viewed place

**Example Request:**
```json
{
  "code": "vilnius-city"
}
```

**Response:**
- **Status Code:** `204 No Content`
- **Body:** Empty

**Error Response:**
- **Status Code:** `500 Internal Server Error`
- **Body:**
  ```json
  {
    "error": "Failed to post viewed place"
  }
  ```

</details>

## Error Handling

All endpoints implement try-catch error handling. In case of errors:
- A `500 Internal Server Error` status code is returned
- An error object with a descriptive message is included in the response body
