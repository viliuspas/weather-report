import { ChangeDetectionStrategy, Component, inject, OnInit, Signal } from '@angular/core';
import { MeteoService } from '../../services/meteo.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Place } from '../../models/place';
import { Dropdown } from "../../components/dropdown/dropdown.component";

@Component({
    selector: 'app-dashboard-page',
    imports: [Dropdown],
    templateUrl: './dashboard-page.component.html',
    styleUrl: './dashboard-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage implements OnInit {
    private readonly meteoService: MeteoService = inject(MeteoService);

    public places: Signal<Place[] | undefined> = toSignal(this.meteoService.places$, { initialValue: undefined });
    public isPlacesLoading: Signal<boolean> = toSignal(this.meteoService.isPlacesLoading$, { initialValue: false });

    public currentPlace: Signal<Place | undefined> = toSignal(this.meteoService.place$, { initialValue: undefined });
    public isCurrentPlaceLoading: Signal<boolean> = toSignal(this.meteoService.isPlaceLoading$, { initialValue: false });

    ngOnInit(): void {
        this.meteoService.loadPlaces();
    }

    getPlaceNames(): string[] {
        return this.places()?.map(place => place.name) ?? [];
    }
}
