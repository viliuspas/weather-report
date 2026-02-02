import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, forkJoin, Observable } from "rxjs";
import { Place } from "../models/place";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { PlaceInfo } from "../models/placeInfo";

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

    private filterLoadedTopPlaces(containsCodes: string[]): PlaceInfo[] {
        return this.topPlacesBehaviorSubject.value?.filter(
            p => containsCodes.includes(p.place.code)
        ) ?? [];
    }
}