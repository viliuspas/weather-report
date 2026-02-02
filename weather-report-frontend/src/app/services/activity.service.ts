import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ActivityService {
    private VIEW_COUNTS_KEY = 'viewCounts';

    private clickedSubject: Subject<void> = new Subject<void>();

    get clicked$(): Observable<void> {
        return this.clickedSubject.asObservable();
    }

    public trackClick(itemId: string) {
        const data: Record<string, number> = JSON.parse(localStorage.getItem(this.VIEW_COUNTS_KEY) || '{}');
        data[itemId] = (data[itemId] || 0) + 1;
        localStorage.setItem(this.VIEW_COUNTS_KEY, JSON.stringify(data));
        this.clickedSubject.next();
    }

    public getTopIds(numOf: number): string[] {
        const data: Record<string, number> = JSON.parse(localStorage.getItem(this.VIEW_COUNTS_KEY) || '{}');
        return Object.entries(data)
            .sort((a, b) => b[1] - a[1])
            .slice(0, numOf)
            .map(([id]) => id);
    }
}