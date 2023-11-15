import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WeatherData } from '../models/weather.models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  private notificationSubject = new BehaviorSubject<string | null>(null);
  notification = this.notificationSubject.asObservable();

  showNotification(message: string): void {
    this.notificationSubject.next(message);
  }

  clearNotification(): void {
    this.notificationSubject.next(null);
  }

  getWeatherData(cityname: string): Observable<WeatherData> {
    return this.http.get<WeatherData>(environment.apidetails.weatherApiBaseurl, {
      headers: new HttpHeaders()
        .set(
          environment.apidetails.XRapidAPIHostHeaderName,
          environment.apidetails.XRapidAPIHostHeaderValue
        )
        .set(
          environment.apidetails.XRapidAPIKeyHeaderName,
          environment.apidetails.XRapidAPIKeyHeaderValue
        ),
      params: new HttpParams().set('city', cityname),
    });
  }
}
