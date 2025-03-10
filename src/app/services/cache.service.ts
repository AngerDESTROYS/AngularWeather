import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cacheDuration = 10 * 60 * 1000;

  constructor() {}

  get<T>(key: string): T | null {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const cachedData = JSON.parse(cached);
    const now = Date.now();

    if (now - cachedData.timestamp > this.cacheDuration) {
      localStorage.removeItem(key);
      return null;
    }

    return cachedData.data;
  }

  set<T>(key: string, data: T): void {
    const cacheData = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(cacheData));
  }

  clear(key: string): void {
    localStorage.removeItem(key);
  }
}
