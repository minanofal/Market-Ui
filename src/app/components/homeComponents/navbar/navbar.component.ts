import { outputAst } from '@angular/compiler';
import { Component, Input, OnInit, Output ,EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/Models/MarketModels/category.model';
import { ConfirmationDialogService } from 'src/app/service/Ui/confirmation-dialog.service';
 

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  roles = localStorage.getItem("roles");
  rolescjeck? :boolean;
  @Input() categories : Category[];
  @Output() newCategory : EventEmitter<any> = new EventEmitter();
  @Output() SelectedCategory : EventEmitter<Category> = new EventEmitter();
  @Output() Home : EventEmitter<any>= new EventEmitter();
  @Output() DeleteCategory : EventEmitter<Category> = new EventEmitter();
  @Output() Editecategory : EventEmitter<any> = new EventEmitter();
  @Output() PassId : EventEmitter<string> = new EventEmitter();
  EditCategory : Category ;
  editchicker : boolean =false;
  showButton = false;
  displayanimation = false;
  showEditForm = false;
  dispalyEdite = false;
  constructor(private router :Router , private dialogService : ConfirmationDialogService ) { }

  ngOnInit(): void {
   this.rolescjeck=this.roles?.includes("Admin");
  }
  logOut(){
    localStorage.removeItem("jwt");
    localStorage.removeItem("roles");
    this.router.navigate(['login']);
  }
  addCategory(event: any){
    this.newCategory.emit(event);
    this.displayanimation =!this.displayanimation;
    if(this.showButton == true){
      console.log(this.showButton);
      setTimeout(()=>{
        this.showButton = false;
      },500);}
  }
  addButton(){
    this.displayanimation =!this.displayanimation;
    if(this.showButton == true){
      setTimeout(()=>{
        this.showButton = false;
      },500);
    }else{
      this.showButton = true;
  }
  
}

openDialog(category : Category){
  this.DeleteCategory.emit(category);
}
Editcategory(category:Category){

  if(!this.editchicker ){
    this.EditCategory =category;
    this.dispalyEdite =!this.dispalyEdite;
    this.showEditForm =!this.showEditForm;
    this.editchicker =!this.editchicker;
  }
  else{
    this.EditCategory =category;
   
  }
  
}

home(){
  this.Home.emit()
}
selectCategory(category : Category){
  this.SelectedCategory.emit(category);
}
EditedCategory(){
  this.editchicker = false;
  this.dispalyEdite =!this.dispalyEdite;
  !this.displayanimation;
   
      setTimeout(()=>{
        this.showEditForm  = !this.showEditForm ;
      },500);
    
}


}
