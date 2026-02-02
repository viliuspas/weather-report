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

    currentPlace: Signal<PlaceInfo | undefined> = toSignal(this.meteoService.currentPlace$, { initialValue: undefined });
    isCurrentPlaceLoading: Signal<boolean> = toSignal(this.meteoService.isCurrentPlaceLoading$, { initialValue: false });
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

    conditionCodeToIconType(conditionCode: string): IconType {
        return this.meteoService.getConditionCodeByIconType(conditionCode);
    }
}