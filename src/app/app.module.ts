import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/Authentications/register/register.component';
import { LoginComponent } from './components/Authentications/login/login.component';
import { HomeComponent } from './components/homeComponents/home/home.component';
import { NavbarComponent } from './components/homeComponents/navbar/navbar.component';

import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{ HttpClientModule} from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { GardService } from './service/auth/gard.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CategoryFormComponent } from './components/homeComponents/category-form/category-form.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { ConfirmationDialogComponent } from './components/ui/confirmation-dialog/confirmation-dialog.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CategoryEditComponent } from './components/homeComponents/category-edit/category-edit.component';
import { TypeListComponent } from './components/homeComponents/type-list/type-list.component';
import { TypeFormeComponent } from './components/homeComponents/type-forme/type-forme.component';
import { TypeEditeComponent } from './components/homeComponents/type-edite/type-edite.component';
import { CompanyListComponent } from './components/homeComponents/company-list/company-list.component';
import { CompanyFormComponent } from './components/homeComponents/company-form/company-form.component';
import { CompanyEditComponent } from './components/homeComponents/company-edit/company-edit.component';
import { ProductListComponent } from './components/homeComponents/product-list/product-list.component';
import { ProductFormComponent } from './components/homeComponents/product-form/product-form.component';
import { GardAdminService } from './service/auth/gard-admin.service';
import { ProductDetailsComponent } from './components/homeComponents/product-details/product-details.component';
import { EditProductComponent } from './components/homeComponents/edit-product/edit-product.component';


const routes : Routes =[
  {path:'',component:HomeComponent , canActivate:[GardService]},
  {path:'productDetailes/:id',component:ProductDetailsComponent , canActivate:[GardService]},
  {path:'Editproduct/:id',component:EditProductComponent , canActivate:[GardAdminService]},
  {path:'productform',component:ProductFormComponent , canActivate:[GardAdminService]},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent}
]
export function tokenGetter(){
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
   

    CategoryFormComponent,
         ConfirmationDialogComponent,
         CategoryEditComponent,
         TypeListComponent,
         TypeFormeComponent,
         TypeEditeComponent,
         CompanyListComponent,
         CompanyFormComponent,
         CompanyEditComponent,
         ProductListComponent,
         ProductFormComponent,
         ProductDetailsComponent,
         EditProductComponent,
       
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config:{
        tokenGetter : tokenGetter,
        allowedDomains : ["localhost:7074"],
        disallowedRoutes : []
      }
    }),
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
   
  ],
  providers: [GardService , GardAdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
