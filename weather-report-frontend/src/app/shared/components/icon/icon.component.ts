import { ChangeDetectionStrategy, Component, input, InputSignal } from "@angular/core";

export enum IconType {
    ARROW_UP = 'arrow-up',
    DROPLET_HALF = 'droplet-half',
    DROPLET = 'droplet',
    CHEVRON_RIGHT = 'chevron-right',
    SUN = 'sun',
    CLOUDY = 'cloudy',
    CLOUD_SUN = 'cloud-sun',
    CLOUDS = 'clouds',
    CLOUD_DRIZZLE = 'cloud-drizzle',
    CLOUD_RAIN = 'cloud-rain',
    CLOUD_RAIN_HEAVY = 'cloud-rain-heavy',
    CLOUD_LIGHTNING = 'cloud-lightning',
    LIGHTNING = 'lightning',
    CLOUD_LIGHTNING_RAIN = 'cloud-lightning-rain',
    CLOUD_SLEET = 'cloud-sleet',
    CLOUD_HAIL = 'cloud-hail',
    CLOUD_SNOW = 'cloud-snow',
    SNOW = 'snow',
    CLOUD_FOG = 'cloud-fog',
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