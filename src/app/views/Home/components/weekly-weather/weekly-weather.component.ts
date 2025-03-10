import { Component, Input } from '@angular/core';
import { Weather } from '../../../../models/weather.model';

@Component({
  selector: 'home-weekly-weather',
  templateUrl: './weekly-weather.component.html',
  styleUrl: './weekly-weather.component.scss',
  standalone: false,
})
export class WeeklyWeatherComponent {
  @Input() weeklyWeather!: Weather[];
}
