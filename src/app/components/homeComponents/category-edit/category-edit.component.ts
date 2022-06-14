import { Component, OnInit , Output , EventEmitter, Input} from '@angular/core';
import { FormControl , FormGroup , Validators } from '@angular/forms';
import { Category } from 'src/app/Models/MarketModels/category.model';
import { CategoryService } from 'src/app/service/Market/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
   icone ="";
  showicone :boolean;
  logo : File;
  @Output() onEditCategory : EventEmitter<any> = new EventEmitter();
  @Output() passId : EventEmitter<string> = new EventEmitter();
  @Input() category : Category ;
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
  constructor(private  categoryService :CategoryService ,private toastr: ToastrService) { }

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
    category.append('name' , this.category.name);
    if(this.showicone){
       category.append('logo' , this.logo);
      
      }
     else{
        category.append('logo' , '');
        
      }
  
 
    this.categoryService.UpdateCategory(category , this.category.id).subscribe( resp => 
     { 
       this.category.logo =resp.logo;
      console.log(this.category.logo);
       this.toastr.success('Category Edited successfully'); 
        },err=> {this.toastr.error(err.error)});
   
    this.showicone= false;
    this.onEditCategory.emit();
    
  }
  cancel(){
    this.onEditCategory.emit();
  }
  
}
