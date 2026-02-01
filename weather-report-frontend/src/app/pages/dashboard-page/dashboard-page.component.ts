import { ChangeDetectionStrategy, Component, inject, OnInit, signal, Signal } from '@angular/core';
import { MeteoService } from '../../services/meteo.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Place } from '../../models/place';
import { DropdownComponent, DropdownItem } from "../../shared/components/dropdown/dropdown.component";

@Component({
    selector: 'app-dashboard-page',
    imports: [DropdownComponent],
    templateUrl: './dashboard-page.component.html',
    styleUrl: './dashboard-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage implements OnInit {
    private readonly meteoService: MeteoService = inject(MeteoService);

    places: Signal<Place[] | undefined> = toSignal(this.meteoService.places$, { initialValue: undefined });
    isPlacesLoading: Signal<boolean> = toSignal(this.meteoService.isPlacesLoading$, { initialValue: false });

    currentPlace: Signal<Place | undefined> = toSignal(this.meteoService.place$, { initialValue: undefined });
    isCurrentPlaceLoading: Signal<boolean> = toSignal(this.meteoService.isPlaceLoading$, { initialValue: false });

    ngOnInit(): void {
        this.meteoService.loadPlaces();
    }

    dropdownItems(): DropdownItem[] {
        return this.places()?.map(place => {
            return {
                id: place.code,
                value: place.name
            } as DropdownItem;
        }) ?? [];
    }

    handleDropdownClick(value: DropdownItem): void {
        console.log(value);
    }
}
