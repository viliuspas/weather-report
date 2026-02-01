import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainHeadingComoponent } from "../../components/main-heading/main-heading.component";
import { ForecastComponent } from "../../components/forecast/forecast.component";
import { QuickAccessComponent } from "../../components/quick-access/quick-access.component";

@Component({
    selector: 'app-dashboard-page',
    imports: [MainHeadingComoponent, ForecastComponent, QuickAccessComponent],
    templateUrl: './dashboard-page.component.html',
    styleUrl: './dashboard-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage {

}
