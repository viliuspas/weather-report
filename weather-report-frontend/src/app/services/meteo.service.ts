import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, delay, forkJoin, Observable } from "rxjs";
import { Place } from "../models/place";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { PlaceInfo } from "../models/placeInfo";
import { IconType } from "../shared/components/icon/icon.component";

@Injectable({
    providedIn: 'root'
})
export class MeteoService {
    private http: HttpClient = inject(HttpClient);

    private readonly API_BASE_PATH: string = 'http://localhost:3000';

    private placesBehaviorSubject: BehaviorSubject<Place[] | undefined> = new BehaviorSubject<Place[] | undefined>(undefined);
    private isPlacesLoadingBehaviorSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private currentPlaceBehaviorSubject: BehaviorSubject<PlaceInfo | undefined> = new BehaviorSubject<PlaceInfo | undefined>(undefined);
    private isCurrentPlaceLoadingBehaviorSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private topPlacesBehaviorSubject: BehaviorSubject<PlaceInfo[] | undefined> = new BehaviorSubject<PlaceInfo[] | undefined>(undefined);
    private isTopPlacesLoadingBehaviorSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    get places$(): Observable<Place[] | undefined> {
        return this.placesBehaviorSubject.asObservable();
    }

    get isPlacesLoading$(): Observable<boolean> {
        return this.isPlacesLoadingBehaviorSubject.asObservable();
    }

    get currentPlace$(): Observable<PlaceInfo | undefined> {
        return this.currentPlaceBehaviorSubject.asObservable();
    }

    get isCurrentPlaceLoading$(): Observable<boolean> {
        return this.isCurrentPlaceLoadingBehaviorSubject.asObservable();
    }

    get topPlace$(): Observable<PlaceInfo[] | undefined> {
        return this.topPlacesBehaviorSubject.asObservable();
    }

    get isTopPlaceLoading$(): Observable<boolean> {
        return this.isTopPlacesLoadingBehaviorSubject.asObservable();
    }

    public setPlace(place: PlaceInfo | undefined): void {
        this.currentPlaceBehaviorSubject.next(place);
        this.isCurrentPlaceLoadingBehaviorSubject.next(false);
    }

    public loadPlaces(): void {
        this.isPlacesLoadingBehaviorSubject.next(true);

        this.http
            .get<Place[]>(this.API_BASE_PATH + '/places')
            .subscribe({
                next: (places: Place[]) => {
                    this.placesBehaviorSubject.next(places);
                },
                error: (err: HttpErrorResponse) => {
                    console.log(`Error getting places: ${err.error}, ${err.message}`);
                },
                complete: () => {
                    this.isPlacesLoadingBehaviorSubject.next(false);
                }
            });
    }

    public loadPlace(placeCode: string): void {
        this.isCurrentPlaceLoadingBehaviorSubject.next(true);

        this.http
            .get<PlaceInfo>(this.API_BASE_PATH + `/places/${placeCode}`)
            .subscribe({
                next: (place: PlaceInfo) => {
                    this.currentPlaceBehaviorSubject.next(place);
                },
                error: (err: HttpErrorResponse) => {
                    console.log(`Error getting place: ${err.error}, ${err.message}`);
                },
                complete: () => {
                    this.isCurrentPlaceLoadingBehaviorSubject.next(false);
                }
            });
    }

    public loadTopPlaces(placeCodes: string[]): void {
        this.isTopPlacesLoadingBehaviorSubject.next(true);

        const loadedCodes: Set<string> = new Set(
            this.topPlacesBehaviorSubject.value?.map(p => p.place.code) ?? []
        );

        const codesToLoad: string[] = placeCodes.filter(code => !loadedCodes.has(code));

        forkJoin(codesToLoad.map(code =>
            this.http.get<PlaceInfo>(this.API_BASE_PATH + `/places/${code}`)
        )).subscribe({
            next: (places: PlaceInfo[]) => {
                this.topPlacesBehaviorSubject.next([
                    ...this.filterLoadedTopPlaces(placeCodes),
                    ...places
                ]);
            },
            error: (err: HttpErrorResponse) => {
                console.log(`Error getting places: ${err.error}, ${err.message}`);
            },
            complete: () => {
                this.isTopPlacesLoadingBehaviorSubject.next(false);
            }
        });
    }

    public getConditionCodeByIconType(forecast: string): IconType {
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

    private filterLoadedTopPlaces(containsCodes: string[]): PlaceInfo[] {
        return this.topPlacesBehaviorSubject.value?.filter(
            p => containsCodes.includes(p.place.code)
        ) ?? [];
    }
}