import { Component, OnInit } from '@angular/core';
import { FormControl,Validators ,FormGroup } from '@angular/forms';
import { Auth } from 'src/app/Models/AuthModels/auth.model';
import { AuthServiceService } from 'src/app/service/auth/auth-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  auth : Auth;
  isvalid = true;
  form = new FormGroup ({
    email : new FormControl('',Validators.compose([Validators.required,Validators.email])),
    firstName : new FormControl('',Validators.compose([Validators.required,Validators.maxLength(50)])),
    lastName : new FormControl('',Validators.compose([Validators.required,Validators.maxLength(50)])),
    userName : new FormControl('',Validators.compose([Validators.required,Validators.maxLength(50)])),
    password : new FormControl('',Validators.compose([Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
    confirmPassword :  new FormControl('',Validators.required)

  });

  get Email(){
    return this.form.get('email');
  }
  get FirstName(){
    return this.form.get('firstName');
  }
  get LastName(){
    return this.form.get('lastName');
  }
  get UserName(){
    return this.form.get('userName');
  }
  get Password(){
    return this.form.get('password');
  }
  get ConfirmPassword(){
    
    if(this.form.getRawValue().password==this.form.getRawValue().confirmPassword && !this.form.get('confirmPassword')?.invalid){
      return false;
    }
    return true;
  }
  constructor( private authservice : AuthServiceService , private router : Router) { }

  ngOnInit(): void {
  
  }

  onSubmit(){
    this.authservice.Register(this.form.getRawValue()).subscribe(resp => {
      const token = (<any>resp).token;
      localStorage.setItem("jwt",token);
      this.router.navigate(['/']);
      this.isvalid=true;
    }
    , err => {this.auth =err.error; this.isvalid=false});
  }

}
