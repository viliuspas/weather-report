import { ChangeDetectionStrategy, Component, computed, input, InputSignal, output, OutputEmitterRef, signal, WritableSignal } from "@angular/core";
import { clickOutsideDirective } from "../../directives/click-outside.directive";

export interface DropdownItem {
    id: string;
    value: string;
    subvalue?: string;
}

@Component({
    selector: 'app-dropdown',
    imports: [clickOutsideDirective],
    templateUrl: './dropdown.component.html',
    styleUrl: './dropdown.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent {
    searchable: InputSignal<boolean> = input.required<boolean>();
    items: InputSignal<DropdownItem[]> = input<DropdownItem[]>([]);
    placeholder: InputSignal<string> = input<string>('');
    size: InputSignal<'small' | 'default' | 'large'> = input<'small' | 'default' | 'large'>('default');
    isLoading: InputSignal<boolean> = input<boolean>(false);
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
            this.items().filter(item => 
                item.value.toLowerCase().includes(value.toLowerCase())
            )
        );
    }

    onItemClick(value: DropdownItem) {
        this.onClick.emit(value);
        this.toggleMenu();
    }

    clickedOutside(): void {
        console.log('outside')
        this.isMenuOpen.set(false);
    }
}