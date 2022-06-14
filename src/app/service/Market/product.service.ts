import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/Models/MarketModels/Product.model';
import { Category } from 'src/app/Models/MarketModels/category.model';
import { Type } from 'src/app/Models/MarketModels/type.model';
import { Company } from 'src/app/Models/MarketModels/Company.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http : HttpClient) { }

  GetProducts(): Observable<Product[]>{
    const  url ="https://localhost:7074/api/Products" ;
    return this.http.get<Product[]>(url);

  }
  GetCategoryProducts(Category : Category) : Observable<Product[]>{
    const url ="https://localhost:7074/api/Products/Category/"+Category.id;
    return this.http.get<Product[]>(url);
  }
  GetTypeProduct(Type : Type):Observable<Product[]>{
    const url ="https://localhost:7074/api/Products/Type/"+Type.id;
    return this.http.get<Product[]>(url);
  }
  GetCompanyProduct(company:Company):Observable<Product[]>{
    const url ="https://localhost:7074/api/Products/Company/"+company.id;
    return this.http.get<Product[]>(url);
  }
  GetCompanyTypeProduct(company:Company , type :Type):Observable<Product[]>{
    const url ="https://localhost:7074/api/Products/Type/Company/"+type.id+"/"+company.id;
    return this.http.get<Product[]>(url);
  }
  
  DeleteProduct(product : Product):Observable<any>{
    const url ="https://localhost:7074/api/Products/DeleteProduct/"+product.id;
    return this.http.delete<any>(url);
  }

  CreateProduct(product:any): Observable<Product>{
    const  url ="https://localhost:7074/api/Products/CreateProduct";
    return this.http.post<Product>(url,product);
  }
  GetProduct(id : string) :Observable<Product>{
    const url ="https://localhost:7074/api/Products/"+id;
    return this.http.get<Product>(url);
  }

  EditProduct(product:any ,id :string): Observable<Product>{
    const  url ="https://localhost:7074/api/Products/UpdateProdduct/"+ id;
    return this.http.put<Product>(url,product);
  }
}
