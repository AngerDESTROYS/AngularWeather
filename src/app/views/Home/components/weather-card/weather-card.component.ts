import { Component, Input } from '@angular/core';
import { Weather } from '../../../../models/weather.model';

@Component({
  selector: 'home-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.scss',
  standalone: false,
})
export class WeatherCardComponent {
  @Input() weatherData!: Weather | null;
  constructor() { }
}
