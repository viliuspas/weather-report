import { Component, ChangeDetectionStrategy, inject, Signal, computed } from "@angular/core";
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
    limitedForecast: Signal<ForecastTimestamp[]> = computed(() => this.currentPlace()?.forecastTimestamps.slice(0, 24) ?? []);

    IconType = IconType;
}