import { ForecastTimestamp } from "./forecastTimestamp";
import { Place } from "./place";

export interface PlaceInfo {
    place: Place;
    forecastTimestamps: ForecastTimestamp[];
}