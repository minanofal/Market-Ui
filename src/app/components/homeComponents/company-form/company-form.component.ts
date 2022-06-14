import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Type } from 'src/app/Models/MarketModels/type.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/Models/MarketModels/category.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent implements OnInit {

  @Input() types : Type[];
  selectedtypes : string[] =[];
  @Input() selectedCategory : Category;
  @Output() submitNewCompany : EventEmitter<any> = new EventEmitter();
  image : any; 
  icone:"";
  showicone : boolean;
  @Output() Cancel : EventEmitter<any> = new EventEmitter();
  form = new FormGroup({
    name : new FormControl('',Validators.compose([Validators.required,Validators.maxLength(50)])),
    image : new FormControl(''),
    type : new FormControl('')
  });

  get Name(){
    return this.form.get('name');
  }
  get Image(){
    return this.form.get('image');
  }
  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  typeselect(type :Type){
    if(!this.selectedtypes.includes(type.id)){
      this.selectedtypes.push(type.id);
    }else{
      this.selectedtypes = this.selectedtypes.filter(t=>t!=type.id);
    }
    
  }
  onFile(e : any){
    this.image = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload=(event : any)=>{
      this.icone = event.target.result;
    }
    this.showicone= true;
  }
  cancel(){
    this.Cancel.emit();
  }
  onSubmit(){
    if(this.selectedtypes.length==0){
      this.toastr.error("types is required");
      return;
    }
    const company = new FormData();
    company.append('name' , this.form.getRawValue()['name']);
    if(this.showicone){ company.append('image' , this.image);}
    else{
      company.append('image' , '');
    }
    company.append('categoryId' , this.selectedCategory.id);
   for(let c of this.selectedtypes){
    company.append('types[]' , c);}
    


    this.submitNewCompany.emit(company);

    this.form.setValue({
      name : "",
     image : "",
     type:""
    });
    this.showicone= false;
  }
}
