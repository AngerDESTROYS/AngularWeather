import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CitiesService } from '../../../services/cities.service';
import { WeatherService } from '../../../services/weather.service';
import { Weather } from '../../../models/weather.model';
import { WeatherForecast } from '../../../models/forecast.model';
import { WeatherMappingService } from '../../../services/weather-mapping.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: false,
})
export class HomeComponent {
  cityForm = new FormControl('');
  weatherData: Weather | null = null;
  weeklyWeather: Weather[] = [];
  errorMessage: string = '';

  constructor(
    public citiesService: CitiesService,
    private weatherService: WeatherService,
    private weatherMappingService: WeatherMappingService,
  ) {}

  getWeatherAndWeeklyForecast(city: string) {
    if (city) {
      this.weatherService.getWeather(city).subscribe((data) => {
        if (data) {
          this.weatherData = data;
          this.errorMessage = '';

          this.getWeeklyWeather(city);
        } else {
          this.weatherData = null;
          this.weeklyWeather = [];
          this.errorMessage = 'No city found with this name';
        }
      });
    }
  }

  getWeeklyWeather(city: string) {
    this.weatherService.getWeeklyWeather(city).subscribe((data) => {
      if (data && data.list) {
        this.weeklyWeather = this.weatherMappingService.mapHourlyToDaily(data.list);
      } else {
        this.weeklyWeather = [];
        this.errorMessage = 'No weekly forecast found';
      }
    });
  }
}
