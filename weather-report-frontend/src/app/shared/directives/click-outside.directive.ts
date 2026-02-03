import { AfterViewInit, Directive, DOCUMENT, ElementRef, EventEmitter, inject, OnDestroy, Output} from "@angular/core";
import { filter, fromEvent, Subscription } from "rxjs";

@Directive({
    selector: '[clickOutside]'
})
export class clickOutsideDirective implements AfterViewInit, OnDestroy {
    private element: ElementRef = inject(ElementRef);
    private document: Document = inject(DOCUMENT);

    @Output() clickOutside = new EventEmitter<void>();

    documentClickSubscription: Subscription | undefined;

    ngAfterViewInit(): void {
        this.documentClickSubscription = fromEvent(this.document, 'click')
            .pipe(filter((event: Event) => !this.isInside(event.target as HTMLElement)))
            .subscribe(() => {
                this.clickOutside.emit();
            });
    }

    isInside(elementToCheck: HTMLElement): boolean {
        return elementToCheck === 
            this.element.nativeElement || this.element.nativeElement.contains(elementToCheck);
    }

    ngOnDestroy(): void {
        this.documentClickSubscription?.unsubscribe();
    }
}