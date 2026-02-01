import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
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

    private placeBehaviorSubject: BehaviorSubject<PlaceInfo | undefined> = new BehaviorSubject<PlaceInfo | undefined>(undefined);
    private isPlaceLoadingBehaviorSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    get places$(): Observable<Place[] | undefined> {
        return this.placesBehaviorSubject.asObservable();
    }

    get isPlacesLoading$(): Observable<boolean> {
        return this.isPlacesLoadingBehaviorSubject.asObservable();
    }

    get place$(): Observable<PlaceInfo | undefined> {
        return this.placeBehaviorSubject.asObservable();
    }

    get isPlaceLoading$(): Observable<boolean> {
        return this.isPlaceLoadingBehaviorSubject.asObservable();
    }

    public setPlace(place: PlaceInfo | undefined): void {
        this.placeBehaviorSubject.next(place);
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
                    this.placeBehaviorSubject.next(place);
                },
                error: (err: HttpErrorResponse) => {
                    console.log(`Error getting place: ${err.error}, ${err.message}`);
                },
                complete: () => {
                    this.isPlaceLoadingBehaviorSubject.next(false);
                }
            });
    }
}