import { Component, ChangeDetectionStrategy, inject, Signal, computed, WritableSignal, signal } from "@angular/core";
import { MeteoService } from "../../services/meteo.service";
import { toSignal } from "@angular/core/rxjs-interop";
import { PlaceInfo } from "../../models/placeInfo";
import { IconComponent, IconType } from "../../shared/components/icon/icon.component";
import { ConditionCodePipe } from "../../shared/pipes/condition-code.pipe";
import { DateTimePipe } from "../../shared/pipes/date-time.pipe";
import { ForecastTimestamp } from "../../models/forecastTimestamp";

@Component({
    selector: 'app-forecast',
    imports: [IconComponent, ConditionCodePipe, DateTimePipe],
    templateUrl: './forecast.component.html',
    styleUrl: './forecast.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastComponent {
    private readonly meteoService: MeteoService = inject(MeteoService);

    currentPlace: Signal<PlaceInfo | undefined> = toSignal(this.meteoService.place$, { initialValue: undefined });
    isCurrentPlaceLoading: Signal<boolean> = toSignal(this.meteoService.isPlaceLoading$, { initialValue: false });
    selectedDay: WritableSignal<number> = signal(0);

    dailyForecast: Signal<ForecastTimestamp[]> = computed(() => {
        const today: number = new Date().getDay();
        const targetDay = (today + this.selectedDay()) % 7;

        if (this.selectedDay() === 0) {
            return this.currentPlace()?.forecastTimestamps.slice(0, 24) ?? [];
        }

        return this.currentPlace()?.forecastTimestamps.filter(timestamp => {
            const forecastDay: number = new Date(timestamp.forecastTimeUtc + 'Z').getDay();
            return forecastDay === targetDay;
        }) ?? [];
    });

    IconType = IconType;

    handlePrevDay(): void {
        this.selectedDay.set(this.selectedDay() - 1);
    }

    handleNextDay(): void {
        this.selectedDay.set(this.selectedDay() + 1);
    }

    conditionCodeToIconType(forecast: string): IconType {
        switch (forecast) {
            case 'clear':
                return IconType.SUN;
            case 'partly-cloudy':
                return IconType.CLOUDY;
            case 'cloudy-with-sunny-intervals':
                return IconType.CLOUD_SUN;
            case 'cloudy':
                return IconType.CLOUDS;
            case 'light-rain':
                return IconType.CLOUD_DRIZZLE;
            case 'rain':
                return IconType.CLOUD_RAIN;
            case 'heavy-rain':
                return IconType.CLOUD_RAIN_HEAVY;
            case 'thunder':
                return IconType.CLOUD_LIGHTNING;
            case 'isolated-thunderstorms':
                return IconType.LIGHTNING;
            case 'thunderstorms':
            case 'heavy-rain-with-thunderstorms':
                return IconType.CLOUD_LIGHTNING_RAIN;
            case 'light-sleet':
            case 'sleet':
            case 'freezing-rain':
                return IconType.CLOUD_SLEET;
            case 'hail':
                return IconType.CLOUD_HAIL;
            case 'light-snow':
                return IconType.CLOUD_SNOW;
            case 'snow':
            case 'heavy-snow':
                return IconType.SNOW;
            case 'fog':
                return IconType.CLOUD_FOG;
            default:
                return IconType.SUN;
        }
    }
}