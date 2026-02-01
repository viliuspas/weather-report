import { ChangeDetectionStrategy, Component, input, InputSignal, signal, WritableSignal } from "@angular/core";

@Component({
    selector: 'app-dropdown',
    imports: [],
    templateUrl: './dropdown.component.html',
    styleUrl: './dropdown.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dropdown {
    searchable: InputSignal<boolean> = input.required<boolean>();
    items: InputSignal<string[]> = input<string[]>([]);

    isMenuOpen: WritableSignal<boolean> = signal(false);

    toggleMenu(): void {
        this.isMenuOpen.set(!this.isMenuOpen());
    }
}