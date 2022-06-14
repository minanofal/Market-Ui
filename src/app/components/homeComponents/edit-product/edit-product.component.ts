import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/Models/MarketModels/category.model';
import { Company } from 'src/app/Models/MarketModels/Company.model';
import { Product } from 'src/app/Models/MarketModels/Product.model';
import { Type } from 'src/app/Models/MarketModels/type.model';
import { CategoryService } from 'src/app/service/Market/category.service';
import { CompanyService } from 'src/app/service/Market/company.service';
import { ProductService } from 'src/app/service/Market/product.service';
import { TypeService } from 'src/app/service/Market/type.service';
import { ConfirmationDialogService } from 'src/app/service/Ui/confirmation-dialog.service';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  product : Product;
  types :Type[] =[] ;
  categories : Category[] =[] ;
  companies : Company[] =[] ;
  selectcategory : boolean= false;
  image : any [] =[];
  showenImage : string[] =[];
  deltedImage : string[] =[];
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
     private route : ActivatedRoute,
     private router : Router) { }

  ngOnInit(): void {
    
    this.categoryService.GetAllCategories().subscribe(resp => {this.categories = resp;});
    this.productServices.GetProduct(this.route.snapshot.params['id']).subscribe(resp=>{this.product=resp;
      this.typeService.GetAllcategoryidTypes(this.product.categoryId).subscribe(resp => {
      
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
      this.companyService.GetAllcategoryidCompanies(this.product.categoryId).subscribe(resp => { if(resp.length !=0){
        this.companies = resp;
        this.selectcategory = true;
      }
      else{
        this.selectcategory = false;
        this.toastr.error("No brands in This Category please Create brands First !");
        return;
      }});
    });
    
    
   
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

  deleteimage(id : string){
    this.dialogService.confirmDialog({
      title: 'Delete Image',
      message: 'Are You Sure Want Delete This Image?',
      confirmCaption: 'Yes',
      cancelCaption: 'Cancel',
    }).subscribe(c => {
      if(c){
        this.deltedImage.push(id);
        console.log(this.deltedImage);
      }})
   
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
    if(this.image.length != 0){
      for(let img of this.image){
        product.append('newproductImages' , img);
      }}
      else{
        product.append('newproductImages' , '');
      }
     
        for(let img of this.deltedImage){
          product.append('deletedImages[]' , img);
        }
      
      
      this.productServices.EditProduct(product,this.route.snapshot.params['id'])
      .subscribe(() => {
        this.toastr.success("The Product Created Successfully");
        this.router.navigate(['/']);
      },err =>{this.toastr.error("Some Thing Went Wrong Check Your inputs"); console.log(err)})
    
    


  }

}
