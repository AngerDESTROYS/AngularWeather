import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, map, catchError } from 'rxjs';
import { City } from '../models/city.model';
import { environment } from '../../environments/environment';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  private citiesApiKey = environment.citiesApiKey;
  private geoApiUrl = environment.geoApiUrl;
  private geoApiHost = environment.geoApiHost;
  constructor(private http: HttpClient, private cacheService: CacheService) {}

  getData(query: string): Observable<string[]> {
      if (!query.trim()) {
        return of([] as string[]);
      }

      const cacheKey = `cities-${query.toLowerCase()}`;
      const cachedCities = this.cacheService.get<string[]>(cacheKey);

      if (cachedCities) {
        return of(cachedCities);
      }

      const headers = new HttpHeaders({
        'x-rapidapi-host': this.geoApiHost,
        'x-rapidapi-key': this.citiesApiKey
      });

      const params = new HttpParams()
        .set('namePrefix', query)
        .set('limit', '5');

    return this.http.get<{ data: { name: string }[] }>(this.geoApiUrl, { headers, params }).pipe(
        map(response => {
          const cityNames = response.data.map((city: { name: string }) => city.name);
          this.cacheService.set(cacheKey, cityNames);
          return cityNames;
        }),
        catchError(error => {
          console.error('Error fetching cities:', error);
          return of([] as string[]);
        })
      );
    }
}
