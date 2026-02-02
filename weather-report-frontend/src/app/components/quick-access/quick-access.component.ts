import { Component, ChangeDetectionStrategy, inject, WritableSignal, signal, OnInit, Signal } from "@angular/core";
import { ActivityService } from "../../services/activity.service";
import { PlaceInfo } from "../../models/placeInfo";
import { MeteoService } from "../../services/meteo.service";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
    selector: 'app-quick-access',
    imports: [],
    templateUrl: './quick-access.component.html',
    styleUrl: './quick-access.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickAccessComponent implements OnInit {
    private readonly activityService: ActivityService = inject(ActivityService);
    private readonly meteoService: MeteoService = inject(MeteoService);

    quickAccessPlaces: Signal<PlaceInfo[] | undefined> = toSignal(this.meteoService.topPlace$, { initialValue: [] });
    isQuickAccessPlacesLoading: Signal<boolean> = toSignal(this.meteoService.isTopPlaceLoading$, { initialValue: false });

    private placeholderPlaceIds: string[] = ['klaipėda', 'kaunas', 'vilnius'];

    ngOnInit(): void {
        this.loadTopPlaces();

        this.activityService.clicked$.subscribe(() =>
            this.loadTopPlaces()
        );
    }

    handleQuickAccessClick(place: PlaceInfo): void {
        this.meteoService.setPlace(place);
        this.activityService.trackClick(place.place.code);
        this.loadTopPlaces();
    }

    private loadTopPlaces(): void {
        const placeIds: string[] = this.activityService.getTopIds(3);
        placeIds.push(
            ...this.placeholderPlaceIds.slice(placeIds.length, this.placeholderPlaceIds.length)
        );
        this.meteoService.loadTopPlaces(placeIds);
    }
}