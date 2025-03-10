import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Weather } from '../models/weather.model';
import { ForecastModel } from '../models/forecast.model';
import { environment } from '../../environments/environment';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = environment.weatherApiKey;
  private weatherApiUrl = environment.weatherApiUrl;
  private forecastApiUrl = environment.forecastApiUrl;

  constructor(private http: HttpClient, private cacheService: CacheService) {}

  getWeather(city: string): Observable<Weather | null> {
    const cacheKey = `weather-${city}`;
    const cachedWeather = this.cacheService.get<Weather>(cacheKey);

    if (cachedWeather) {
      return of(cachedWeather);
    }

    const params = new HttpParams()
      .set('q', city)
      .set('appid', this.apiKey)
      .set('units', 'metric');

    return this.http.get<Weather>(this.weatherApiUrl, { params }).pipe(
      catchError(error => {
        console.error('Error fetching weather data:', error);
        return of(null);
      }),
      map((weatherData) => {
        if (weatherData) {
          this.cacheService.set(cacheKey, weatherData);
        }
        return weatherData;
      })
    );
  }

  getWeeklyWeather(city: string): Observable<ForecastModel | null> {
    const cacheKey = `weekly-weather-${city}`;
    const cachedForecast = this.cacheService.get<ForecastModel>(cacheKey);

    if (cachedForecast) {
      return of(cachedForecast);
    }

    const params = new HttpParams()
      .set('q', city)
      .set('appid', this.apiKey)
      .set('units', 'metric');

    return this.http.get<ForecastModel>(this.forecastApiUrl, { params }).pipe(
      catchError(error => {
        console.error('Error fetching weekly weather data:', error);
        return of(null);
      }),
      map((forecastData) => {
        if (forecastData) {
          this.cacheService.set(cacheKey, forecastData);
        }
        return forecastData;
      })
    );
  }
}
