import { Injectable } from '@angular/core';
import { emptyWeather, Weather } from '../models/weather.model';
import { WeatherForecast } from '../models/forecast.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherMappingService {

  constructor() {}

  mapHourlyToDaily(hourlyData: WeatherForecast[]): Weather[] {
    const dailyData: { [date: string]: WeatherForecast[] } = {};

    hourlyData.forEach((entry) => {
      const date = new Date(entry.dt * 1000).toDateString();
      if (!dailyData[date]) {
        dailyData[date] = [];
      }
      dailyData[date].push(entry);
    });

    return Object.keys(dailyData).map((date) => {
      const entries = dailyData[date];
      const tempAvg = this.roundToTwoDecimalPlaces(entries.reduce((sum, entry) => sum + entry.main.temp, 0) / entries.length);
      const feelsLikeAvg = this.roundToTwoDecimalPlaces(entries.reduce((sum, entry) => sum + entry.main.feels_like, 0) / entries.length);
      const humidityAvg = this.roundToTwoDecimalPlaces(entries.reduce((sum, entry) => sum + entry.main.humidity, 0) / entries.length);
      const windSpeedAvg = this.roundToTwoDecimalPlaces(entries.reduce((sum, entry) => sum + entry.wind.speed, 0) / entries.length);
      const weather = entries[0].weather[0];

      const weatherForTheDay: Weather = { ...emptyWeather, main: { ...emptyWeather.main }, wind: { ...emptyWeather.wind }, sys: { ...emptyWeather.sys }, clouds: { ...emptyWeather.clouds } };

      weatherForTheDay.main.temp = tempAvg;
      weatherForTheDay.main.feels_like = feelsLikeAvg;
      weatherForTheDay.main.humidity = humidityAvg;
      weatherForTheDay.wind.speed = windSpeedAvg;
      weatherForTheDay.weather = [{ ...weather }];
      weatherForTheDay.name = date;

      return weatherForTheDay;
    });
  }

  private roundToTwoDecimalPlaces(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
