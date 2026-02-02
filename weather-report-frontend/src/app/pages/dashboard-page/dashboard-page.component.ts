import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { MainHeadingComoponent } from "../../components/main-heading/main-heading.component";
import { ForecastComponent } from "../../components/forecast/forecast.component";
import { QuickAccessComponent } from "../../components/quick-access/quick-access.component";
import { toSignal } from '@angular/core/rxjs-interop';
import { MeteoService } from '../../services/meteo.service';
import { PlaceInfo } from '../../models/placeInfo';

@Component({
    selector: 'app-dashboard-page',
    imports: [MainHeadingComoponent, ForecastComponent, QuickAccessComponent],
    templateUrl: './dashboard-page.component.html',
    styleUrl: './dashboard-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage {
    private readonly meteoService: MeteoService = inject(MeteoService);

    currentPlace: Signal<PlaceInfo | undefined> = toSignal(this.meteoService.currentPlace$, { initialValue: undefined });
    isCurrentPlaceLoading: Signal<boolean> = toSignal(this.meteoService.isCurrentPlaceLoading$, { initialValue: false });
}
