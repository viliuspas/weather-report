import { ForecastTimestamp } from "./forecastTimestamp";

export interface Place {
    code: string;
    name: string;
    administrativeDivision: string;
    country: string;
    countryCode: string;
    coordinates: {
        latitude: number,
        longitude: number
    };
}