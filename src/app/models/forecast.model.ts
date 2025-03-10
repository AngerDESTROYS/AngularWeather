export interface ForecastModel {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherForecast[];
  city: WeatherCity;
}

export interface WeatherForecast {
  dt: number;
  main: MainWeatherData;
  weather: WeatherDescription[];
  clouds: CloudData;
  wind: WindData;
  visibility: number;
  pop: number;
  sys: SysData;
  dt_txt: string;
}

export interface MainWeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  temp_kf: number;
}

export interface WeatherDescription {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface CloudData {
  all: number;
}

export interface WindData {
  speed: number;
  deg: number;
  gust?: number;
}

export interface SysData {
  pod: string;
}

export interface WeatherCity {
  id: number;
  name: string;
  coord: Coordinates;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface Coordinates {
  lat: number;
  lon: number;
}
