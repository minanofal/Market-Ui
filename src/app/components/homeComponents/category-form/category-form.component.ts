import { Component, OnInit , Output , EventEmitter } from '@angular/core';
import { FormControl , FormGroup , Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr/toastr/toastr.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  icone ="";
  showicone :boolean;
  logo : any;
  @Output() onAddCategory : EventEmitter<any> = new EventEmitter();
  form = new FormGroup({
    name : new FormControl('',Validators.compose([Validators.required,Validators.maxLength(50)])),
    logo : new FormControl('')
  });

  get Name(){
    return this.form.get('name');
  }
  get Logo(){
    return this.form.get('logo');
  }
  constructor() { }

  ngOnInit(): void {
  }

  onFile(e : any){
    this.logo = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload=(event : any)=>{
      this.icone = event.target.result;
    }
    this.showicone= true;
  }

  onSubmit(){
    const category = new FormData();
    category.append('name' , this.form.getRawValue()['name']);
      if(this.showicone){ category.append('logo' , this.logo);}
     else{ category.append('logo' , '');}
   
    this.onAddCategory.emit(category);
    this.form.setValue({
      name : "",
      logo : ""
    });
    this.showicone= false;
  }

}
