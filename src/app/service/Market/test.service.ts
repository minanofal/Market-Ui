import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TestService {
  url =" https://localhost:7074/WeatherForecast";
  constructor( private http: HttpClient) { }
  getall():Observable<any[]>{
    return this.http.get<any[]>(this.url);
  }
}
