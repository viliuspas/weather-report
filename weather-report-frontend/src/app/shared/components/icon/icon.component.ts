import { ChangeDetectionStrategy, Component, input, InputSignal } from "@angular/core";

export enum IconType {
    ARROW_UP = 'arrow-up',
    DROPLET_HALF = 'droplet-half',
    DROPLET = 'droplet',
    CHEVRON_RIGHT = 'chevron-right'
}

@Component({
    selector: 'app-icon',
    imports: [],
    templateUrl: './icon.component.html',
    styleUrl: './icon.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
    type: InputSignal<IconType> = input.required();
    rotate: InputSignal<number> = input(0);
    IconType = IconType;
}