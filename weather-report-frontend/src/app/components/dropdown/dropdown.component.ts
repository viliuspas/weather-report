import { ChangeDetectionStrategy, Component, computed, input, InputSignal, OnInit, output, OutputEmitterRef, signal, WritableSignal } from "@angular/core";

@Component({
    selector: 'app-dropdown',
    imports: [],
    templateUrl: './dropdown.component.html',
    styleUrl: './dropdown.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dropdown implements OnInit {
    searchable: InputSignal<boolean> = input.required<boolean>();
    items: InputSignal<string[]> = input<string[]>([]);
    placeholder: InputSignal<string> = input<string>('');
    onClick: OutputEmitterRef<string> = output<string>();

    filteredItems: WritableSignal<string[]> = signal([]);
    isMenuOpen: WritableSignal<boolean> = signal(false);

    ngOnInit(): void {
        this.filteredItems.set(this.items());
    }

    toggleMenu(): void {
        this.isMenuOpen.set(!this.isMenuOpen());
    }

    onValueChange(value: string): void {
        if (value === '') {
            this.isMenuOpen.set(false);
            return;
        }

        this.isMenuOpen.set(true);
        this.filteredItems.set(
            this.items().filter(item => item.toLowerCase().includes(value.toLowerCase()))
        );
    }

    onItemClick(value: string) {
        this.onClick.emit(value);
    }
}