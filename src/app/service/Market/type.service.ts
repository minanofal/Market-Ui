import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from 'src/app/Models/MarketModels/category.model';
import { Type } from 'src/app/Models/MarketModels/type.model';
import { TypeForm } from 'src/app/Models/MarketModels/TypeForm.model';

const httOptiona = {
  headers : new HttpHeaders({
    'Content-Type':'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(private http : HttpClient) { }

  GetTypes(category : Category): Observable<Type[]>{
    const  url ="https://localhost:7074/api/types/typesofcategory/" + category.id;
    return this.http.get<Type[]>(url);

  }
  CreateType(type : TypeForm):Observable<Type>{
    const url="https://localhost:7074/api/types/CreateType";
    return this.http.post<Type>(url,type,httOptiona);
  }
  DeleteType(type :Type) : Observable<string>{
    const url = "https://localhost:7074/api/types/DeleteType/"+type.id;
    return this.http.delete<string>(url);
  }
  UpdateType(type :TypeForm): Observable<Type>{
    const url ="https://localhost:7074/api/types/UpdateType/"+type.id;
    return this.http.put<Type>(url,type,httOptiona);
  }
  GetAllcategoryidTypes(id : string) : Observable<Type[]>{
    const  url ="https://localhost:7074/api/types/typesofcategory/" +id;
    return this.http.get<Type[]>(url);
  }
}
