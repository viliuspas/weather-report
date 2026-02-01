import { Component, ChangeDetectionStrategy, inject, Signal } from "@angular/core";
import { MeteoService } from "../../services/meteo.service";
import { toSignal } from "@angular/core/rxjs-interop";
import { PlaceInfo } from "../../models/placeInfo";
import { IconComponent, IconType } from "../../shared/components/icon/icon.component";
import { ConditionCodePipe } from "../../shared/pipes/condition-code.pipe";

@Component({
    selector: 'app-forecast',
    imports: [IconComponent, ConditionCodePipe],
    templateUrl: './forecast.component.html',
    styleUrl: './forecast.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastComponent {
    private readonly meteoService: MeteoService = inject(MeteoService);

    currentPlace: Signal<PlaceInfo | undefined> = toSignal(this.meteoService.place$, { initialValue: undefined });
    isCurrentPlaceLoading: Signal<boolean> = toSignal(this.meteoService.isPlaceLoading$, { initialValue: false });
    
    IconType = IconType;
}