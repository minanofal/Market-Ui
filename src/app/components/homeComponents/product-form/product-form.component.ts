import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/Models/MarketModels/category.model';
import { Company } from 'src/app/Models/MarketModels/Company.model';
import { Type } from 'src/app/Models/MarketModels/type.model';
import { CategoryService } from 'src/app/service/Market/category.service';
import { CompanyService } from 'src/app/service/Market/company.service';
import { ProductService } from 'src/app/service/Market/product.service';
import { TypeService } from 'src/app/service/Market/type.service';
import { ConfirmationDialogService } from 'src/app/service/Ui/confirmation-dialog.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  types :Type[] =[] ;
  categories : Category[] =[] ;
  companies : Company[] =[] ;
  selectcategory : boolean= false;
  image : any [] =[];
  showenImage : string[] =[];
  imagecount = 0;
  isShowImage : boolean = false;
  showindex = 0;
  form = new FormGroup({
    name : new FormControl('', Validators.compose([Validators.required, Validators.maxLength(50)])),
    price : new FormControl('', Validators.required),
    discription : new FormControl('', Validators.compose([Validators.required, Validators.maxLength(1000), Validators.minLength(100)])),
    totalCount : new FormControl('', Validators.required),
    types : new FormControl('', Validators.required),
    categories : new FormControl('', Validators.required),
    companies : new FormControl('', Validators.required),
    images : new FormArray([new FormControl('')])
  

});

get Name(){
  return this.form.get('name');
}
get Images() : FormArray{
  return this.form.get('images') as FormArray;
}
get Price(){
  return this.form.get('price');
}
get Discription(){
  return this.form.get('discription');
}

get TotalCount(){
  return this.form.get('totalCount');
}
get Types(){
  return this.form.get('types');
}

get Categories(){
  return this.form.get('categories');
}
get Companies(){
  return this.form.get('companies');
}

  addimage(){
    this.Images.push( new FormControl('',Validators.required));
  }
  removeimage(idx:number){
    this.Images.removeAt(idx);
    this.showenImage.splice(idx,1);
    this.image.splice(idx,1);
    this.imagecount -- ;
    this.showindex --;
  
  }
  constructor(private typeService : TypeService,
    private categoryService : CategoryService ,
    private toastr: ToastrService,
     private dialogService : ConfirmationDialogService,
     private companyService : CompanyService,
     private productServices : ProductService,
     private router : Router) { }

  ngOnInit(): void {
    
    this.categoryService.GetAllCategories().subscribe(resp => {this.categories = resp;});
   
  }
  selectCategory(event : any){
    
    this.typeService.GetAllcategoryidTypes(event.target.value).subscribe(resp => {
      
      if(resp.length !=0){
        this.types = resp;
        this.selectcategory = true;
      }
      else{
        this.selectcategory = false;
        this.toastr.error("No types in This Category please Create Types First !");
        return;
      }
    });
    this.companyService.GetAllcategoryidCompanies(event.target.value).subscribe(resp => { if(resp.length !=0){
      this.companies = resp;
      this.selectcategory = true;
    }
    else{
      this.selectcategory = false;
      this.toastr.error("No brands in This Category please Create brands First !");
      return;
    }});
    
  }

  onFile(e : any ,  idx : number){
    this.image.push(e.target.files[0]);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload=(event : any)=>{
      if(this.imagecount<idx){
      this.showenImage.push(event.target.result);
      this.imagecount = idx
      this.showindex = idx;
    }
      else{
        this.showenImage[idx]= event.target.result;
        this.showindex = idx;
      }
    }
   
    this.isShowImage= true;
  }

  rightrow(){
    this.showindex++;
  }
  leftrow(){
    this.showindex--;
  }

  onSubmit(){
    const product = new FormData();
    product.append('name', this.form.getRawValue()['name']);
    product.append('price',this.form.getRawValue()['price']);
    product.append('description',this.form.getRawValue()['discription']);
    product.append('totlaCount',this.form.getRawValue()['totalCount']);
    product.append('typeId',this.form.getRawValue()['types']);
    product.append('categoryId',this.form.getRawValue()['categories']);
    product.append('companyId',this.form.getRawValue()['companies']);
    if(this.image.length == 0){
      this.toastr.error("You Must Upload AtLeast One Image");
      return;
    }else{
      for(let img of this.image){
        product.append('productImages' , img);
        
      }
      
      this.productServices.CreateProduct(product)
      .subscribe(() => {
        this.toastr.success("The Product Created Successfully");
        this.router.navigate(['/']);
      },err =>{this.toastr.error("Some Thing Went Wrong Check Your inputs");})
    }
    


  }
}
