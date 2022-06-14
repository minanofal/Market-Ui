import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from 'src/app/Models/AuthModels/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http : HttpClient) { }

  Register(from : any) : Observable<Auth>{
   const url = "https://localhost:7074/api/Authentication/Register";
   return this.http.post<Auth>(url,from);
  }

Login(from : any) : Observable<Auth>{
  const url = "https://localhost:7074/api/Authentication/Login";
  return this.http.post<Auth>(url,from);
 }
}
