import { Injectable } from '@angular/core';
import { CanActivate , Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable({
  providedIn: 'root'
})
export class GardAdminService implements CanActivate {

  constructor(private router:Router , private jwtHelper : JwtHelperService){}

  canActivate(){
    const token = localStorage.getItem("jwt");
    const Role = localStorage.getItem("roles")
    if(token && !this.jwtHelper.isTokenExpired(token)&&Role?.includes("Admin")){
        return true;
    }
    this.router.navigate([""]);
    return false;
    
}
}
