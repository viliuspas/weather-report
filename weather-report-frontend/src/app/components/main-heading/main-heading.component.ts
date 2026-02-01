import { ChangeDetectionStrategy, Component, inject, OnInit, Signal } from "@angular/core";
import { DropdownComponent, DropdownItem } from "../../shared/components/dropdown/dropdown.component";
import { toSignal } from "@angular/core/rxjs-interop";
import { Place } from "../../models/place";
import { MeteoService } from "../../services/meteo.service";

@Component({
    selector: 'app-main-heading',
    imports: [DropdownComponent],
    templateUrl: './main-heading.component.html',
    styleUrl: './main-heading.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainHeadingComoponent implements OnInit {
    private readonly meteoService: MeteoService = inject(MeteoService);

    places: Signal<Place[] | undefined> = toSignal(this.meteoService.places$, { initialValue: undefined });
    isPlacesLoading: Signal<boolean> = toSignal(this.meteoService.isPlacesLoading$, { initialValue: false });

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
        this.meteoService.loadPlace(value.id);
    }
}