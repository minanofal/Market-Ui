import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/Market/category.service';
import { Category } from 'src/app/Models/MarketModels/category.model';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from 'src/app/service/Ui/confirmation-dialog.service';
import { TypeService } from 'src/app/service/Market/type.service';
import { CompanyService } from 'src/app/service/Market/company.service';
import { Type } from 'src/app/Models/MarketModels/type.model';
import { TypeForm } from 'src/app/Models/MarketModels/TypeForm.model';
import { Company } from 'src/app/Models/MarketModels/Company.model';
import { ProductService } from 'src/app/service/Market/product.service';
import { Product } from 'src/app/Models/MarketModels/Product.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories : Category[];
  categoryErrorMessage : string = "";
  passedid :string;
  selectedCategory : Category;
  selectedType : Type;
  types : Type[] =[] ;
  companies : Company[]=[];
  displayanimation : boolean = false;
  showCategoryCompanantes : boolean = false ;
  showCompanyForm : boolean = false;
  showCompanyAnimation : boolean= false;
  EditedCompany :Company;
  showCompanyEditForm : boolean = false;
  showCompanyEditAnimation : boolean= false;
  editedCompnaySelectedTypes : Type[]=[];
  editedCompnayUnSelectedTypes : Type[]=[];
  roles = localStorage.getItem("roles");
  rolescjeck? :boolean;
  products : Product[] =[];
  selectedCompany : Company;

  selecttype : boolean = false;
  selectedid : string;

  constructor(private typeService : TypeService,
    private categoryService : CategoryService ,
    private toastr: ToastrService,
     private dialogService : ConfirmationDialogService,
     private companyService : CompanyService,
     private productServices : ProductService) { }



  ngOnInit(): void {
    this.productServices.GetProducts().subscribe(resp => {this.products =resp;
      for(let p of this.products){
        p.countimage =0 ;
      }
    });

    this.categoryService.GetAllCategories()
    .subscribe(resp =>
        {
          this.categories = resp;
        });
        this.rolescjeck=this.roles?.includes("Admin");
  }


  addNewCategory(event : any){
    this.categoryService.CreateCategory(event)
    .subscribe(resp=>
      {
        this.categories.push(resp);
         this.toastr.success('Category added successfully');
         },err=> {
           this.toastr.error(err.error);
          });
  }


  deletcategory(category : Category){
    this.dialogService.confirmDialog({
      title: 'Delete Category',
      message: 'Are You Sure Want Delete That Category?',
      confirmCaption: 'Yes',
      cancelCaption: 'Cancel',
    }).subscribe(c => {
      if(c){this.categoryService.DeleteCategory(category).subscribe(resp => 
        {
          this.categories=this.categories.filter(c=>c.id!==resp);
          this.toastr.success('Category deleted successfully');
        }
      ,err=> {this.toastr.error(err.error)})
      }});
  }


  PassID(id:string){
    this.passedid = id;
  }


  selectedcategory(event : Category){
    if(this.selectedCategory!=event){
      this.selectedCategory = event;
      this.typeService.GetTypes(event)
        .subscribe(resp=>
          {
            this.types=resp;
          } , err =>{ 
              this.toastr.error(err.error);
          });
      this.companyService.GetCompanies(event)
      .subscribe(resp =>{
        this.companies = resp;
      }, err =>{ 
        this.toastr.error(err.error);
      } 
      )
      this.productServices.GetCategoryProducts(event)
      .subscribe(resp => {this.products = resp; for(let p of this.products){
        p.countimage =0 ;
      }}
        ,err =>{ 
          this.toastr.error(err.error);
        } )
    }
    
    this.displayanimation = false;
    this.showCategoryCompanantes=false;
    setTimeout(()=>{
    this.displayanimation = true;
    this.showCategoryCompanantes=true;
    },100);
    
  }



  home(){

    this.displayanimation=false;
    setTimeout(()=>{
  this.showCategoryCompanantes  =false ;
    },500);
    this.productServices.GetProducts().subscribe(resp => {this.products =resp; for(let p of this.products){
      p.countimage =0 ;
    }});
  }



  NewType(event : TypeForm){
    this.typeService.CreateType(event).subscribe(
      resp => {
        this.types.push(resp); 
      this.toastr.success('Type added successfully');}, 
      err=> {this.toastr.error(err.error)});
  }



  deletedType(event : Type){
    this.dialogService.confirmDialog({
      title: 'Delete Type',
      message: 'Are You Sure Want Delete That Type?',
      confirmCaption: 'Yes',
      cancelCaption: 'Cancel',
    }).subscribe(c => {
      if(c){this.typeService.DeleteType(event).subscribe(resp => 
        {
          this.types=this.types.filter(c=>c.id!==resp);
          this.companyService.GetCompanies(this.selectedCategory)
          .subscribe(resp =>{
            this.companies = resp;
            console.log(resp);
          }, err =>{ 
            this.toastr.error(err.error);
          } 
          )
          this.toastr.success('Type deleted successfully');
        }
      ,err=> {this.toastr.error(err.error)})
      }});
  }


  
  edittype(event : TypeForm){
    this.typeService.UpdateType(event).subscribe(
      resp => {
      this.toastr.success(`Type ${resp.name} Edited successfully`);}, 
      err=> {this.toastr.error(err.error)});
  }

  selectType(event : Type){
    this.selectedid="";
    this.selecttype = true;
    this.selectedType = event;
    this.companyService.GetCompaniesType(event).
    subscribe(resp=>{
      this.companies = resp;
    },err =>{this.toastr.error(err.error);});
    this.productServices.GetTypeProduct(event)
    .subscribe(resp => {this.products = resp; for(let p of this.products){
      p.countimage =0 ;
    }}
      ,err =>{ 
        this.toastr.error(err.error);
      } )
  }
  AllTypes(){
    this.selectedid="";
    this.selecttype =false;
    this.companyService.GetCompanies(this.selectedCategory)
    .subscribe(resp =>{
      this.companies = resp;
    }, err =>{ 
      this.toastr.error(err.error);
    } 
    )
    this.productServices.GetCategoryProducts(this.selectedCategory)
    .subscribe(resp => {this.products = resp; for(let p of this.products){
      p.countimage =0 ;
    }}
      ,err =>{ 
        this.toastr.error(err.error);
      } )

  }
  newcompany(){
    
    if(this.types[0]==null){
      this.toastr.error('There is no Types please create types first');
      return;
    }
    this.showCompanyAnimation = ! this.showCompanyAnimation;
    if( this.showCompanyForm == true){
      setTimeout(()=>{
        this.showCompanyForm = false ;
          },500);}
          else{
            this.showCompanyForm = true;
          }
    }

    submitNewCompany(event : any){
      this.companyService.CreateCompany(event)
      .subscribe(resp => {this.companies.push(resp);
      this.toastr.success("Company Created Successfully");
    this.newcompany();},
      err=> this.toastr.error(err.error));
    }
    delete(event : Company){
      
        this.dialogService.confirmDialog({
          title: 'Delete Company',
          message: 'Are You Sure Want Delete This Company?',
          confirmCaption: 'Yes',
          cancelCaption: 'Cancel',
        }).subscribe(c => {
          if(c){this.companyService.DeleteCompany(event).subscribe(resp => 
            {
              this.companies=this.companies.filter(c=>c.id!==resp.id);
              this.toastr.success(resp.message);
            }
          ,err=> {this.toastr.error(err.error)})
          }});
    }
    edit(event : Company){
      this.editedCompnaySelectedTypes  =[];
      this.editedCompnayUnSelectedTypes=[];
      for(let t of this.types){
        if(event.types.includes(t.id)){
          this.editedCompnaySelectedTypes.push(t);
        }
        else{
          this.editedCompnayUnSelectedTypes.push(t);
        }
      }
      this.EditedCompany = event;
      this.showCompanyEditAnimation = ! this.showCompanyEditAnimation;
      if( this.showCompanyForm == true){
        setTimeout(()=>{
          this.showCompanyEditForm = false ;
            },500);}
            else{
              this.showCompanyEditForm = true;
            }
    }
    cancelEdit(){
      this.showCompanyEditAnimation = ! this.showCompanyEditAnimation;
      if( this.showCompanyForm == true){
        setTimeout(()=>{
          this.showCompanyEditForm = false ;
            },500);}
            else{
              this.showCompanyEditForm = true;
            }
    }
    SelectCompany(event :Company){
      this.selectedid = event.id;
      this.selectedCompany = event ;
     if(!this.selecttype){
      this.productServices.GetCompanyProduct(event)
      .subscribe(resp => {this.products = resp; for(let p of this.products){
        p.countimage =0 ;
      }}
        ,err =>{ 
          this.toastr.error(err.error);
        } )
    }
  else{
  this.productServices.GetCompanyTypeProduct(event, this.selectedType)
  .subscribe(resp => {this.products = resp; for(let p of this.products){
    p.countimage =0 ;
  }}
    ,err =>{ 
      this.toastr.error(err.error);
    } )
  }
    
}

Deleteproduct(event : Product){
  this.dialogService.confirmDialog({
    title: 'Delete Product',
    message: 'Are You Sure Want Delete This Product?',
    confirmCaption: 'Yes',
    cancelCaption: 'Cancel',
  }).subscribe(c => {
    if(c){this.productServices.DeleteProduct(event).subscribe(resp => 
      {
        this.products=this.products.filter(c=>c.id!==resp);
        this.toastr.success("Product Deleted Successully");
      }
    ,err=> {this.toastr.error(err.error)})
    }});
}
} 

