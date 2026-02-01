import { Component } from '@angular/core';
import { DashboardPage } from "./pages/dashboard-page/dashboard-page.component";

@Component({
  selector: 'app-root',
  imports: [DashboardPage],
  styleUrl: './app.scss',
  templateUrl: './app.html'
})
export class App {
  protected title = 'weather-report-frontend';
}
