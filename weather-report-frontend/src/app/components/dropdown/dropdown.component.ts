import { ChangeDetectionStrategy, Component, computed, input, InputSignal, OnInit, output, OutputEmitterRef, signal, WritableSignal } from "@angular/core";

export interface DropdownItem {
    id: string;
    value: string;
}

@Component({
    selector: 'app-dropdown',
    imports: [],
    templateUrl: './dropdown.component.html',
    styleUrl: './dropdown.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent {
    searchable: InputSignal<boolean> = input.required<boolean>();
    items: InputSignal<DropdownItem[]> = input<DropdownItem[]>([]);
    placeholder: InputSignal<string> = input<string>('');
    onClick: OutputEmitterRef<DropdownItem> = output<DropdownItem>();

    filteredItems = computed(() => [...this.items()]);
    isMenuOpen: WritableSignal<boolean> = signal(false);

    toggleMenu(): void {
        
        this.isMenuOpen.set(!this.isMenuOpen());
    }

    onValueChange(value: string): void {
        if (value === '') {
            this.isMenuOpen.set(false);
            this.filteredItems = computed(() => [...this.items()]);
            return;
        }

        this.isMenuOpen.set(true);
        this.filteredItems = computed(() =>
            this.items().filter(item => item.value.toLowerCase().includes(value.toLowerCase()))
        );
    }

    onItemClick(value: DropdownItem) {
        this.onClick.emit(value);
    }
}