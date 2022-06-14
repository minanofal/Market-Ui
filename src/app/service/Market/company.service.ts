import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from 'src/app/Models/MarketModels/Company.model';
import { Category } from 'src/app/Models/MarketModels/category.model';
import { Type } from 'src/app/Models/MarketModels/type.model';
@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http : HttpClient) { }

  GetCompanies(category : Category): Observable<Company[]>{
    const  url ="https://localhost:7074/api/Companies/category/" + category.id;
    return this.http.get<Company[]>(url);

  }
  GetCompaniesType(type :Type): Observable<Company[]>{
    const  url ="https://localhost:7074/api/Companies/type/" + type.id;
    return this.http.get<Company[]>(url);

  }

  CreateCompany(company:any): Observable<Company>{
    const  url ="https://localhost:7074/api/Companies/CreateComapny/";
    return this.http.post<Company>(url,company);
  }
  DeleteCompany(company:Company) : Observable<any>{
    const url ="https://localhost:7074/api/Companies/DeleteCompan/"+company.id;
    return this.http.delete<any>(url);
  }
  UpdateCompany(company : any ,  id : string) :Observable<Company>{
    const  url ="https://localhost:7074/api/Companies/UpdateComapn/"+id;
    return this.http.put<Company>(url,company);
  }
  
  GetAllcategoryidCompanies(id : string): Observable<Company[]>{
    const url ="https://localhost:7074/api/Companies/category/" +id;
    return this.http.get<Company[]>(url);

  }
}
