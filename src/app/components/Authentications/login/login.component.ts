import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl , Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/service/auth/auth-service.service';
import { Auth } from 'src/app/Models/AuthModels/auth.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  auth : Auth;
  isvalid = true;
  errorMessage :string;
  form = new FormGroup ({
    email : new FormControl('',Validators.compose([Validators.required,Validators.email])),
    password :  new FormControl('',Validators.required)

  });

  get Email(){
    return this.form.get('email');
  }
  get Password(){
    return this.form.get('password');
  }
  constructor( private authservice : AuthServiceService , private router : Router) { }

  ngOnInit(): void {
  }
  onSubmit(){
    this.authservice.Login(this.form.getRawValue()).subscribe(resp => {
      const token = (<any>resp).token;
      const role = (<any>resp).roles;
      localStorage.setItem("jwt",token);
      localStorage.setItem("roles",role);
      this.router.navigate(['/']);
      this.isvalid=true;
    }
    , err => {this.errorMessage =err.error; this.isvalid=false});
  }
  }


