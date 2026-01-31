export interface ForecastTimestamp {
    forecastTimeUtc: string;
    airTemperature: number;
    feelsLikeTemperature: number;
    windSpeed: number;
    windGust: number;
    windDirection: number;
    cloudCover: number;
    seaLevelPressure: number;
    relativeHumidity: number;
    totalPrecipitation: number;
    conditionCode: string;
}