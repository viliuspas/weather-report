import { Component, ChangeDetectionStrategy, inject, Signal } from "@angular/core";
import { MeteoService } from "../../services/meteo.service";
import { toSignal } from "@angular/core/rxjs-interop";
import { PlaceInfo } from "../../models/placeInfo";

@Component({
    selector: 'app-forecast',
    imports: [],
    templateUrl: './forecast.component.html',
    styleUrl: './forecast.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastComponent {
    private readonly meteoService: MeteoService = inject(MeteoService);

    currentPlace: Signal<PlaceInfo | undefined> = toSignal(this.meteoService.place$, { initialValue: undefined });
    isCurrentPlaceLoading: Signal<boolean> = toSignal(this.meteoService.isPlaceLoading$, { initialValue: false });
}