import { Component, OnInit , Input, Output , EventEmitter} from '@angular/core';
import { Category } from 'src/app/Models/MarketModels/category.model';
import { Company } from 'src/app/Models/MarketModels/Company.model';
@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  roles = localStorage.getItem("roles");
  rolescjeck? :boolean;
  @Input() selectedCategory : Category;
  @Input() companies : Company[];
  @Output() NewCompany : EventEmitter<any>= new EventEmitter();
  @Output() deleteCompany : EventEmitter<Company>= new EventEmitter();
  @Output() EditCompany : EventEmitter<Company>= new EventEmitter();
  @Output() SelectCompany : EventEmitter<Company>= new EventEmitter();
  @Input() selectedid : string ;
 

  constructor() {
   }

  ngOnInit(): void {
    
    this.rolescjeck=this.roles?.includes("Admin");
  }
  newCompany(){
    this.NewCompany.emit();
  }
  ondelete(company : Company){
    this.deleteCompany.emit(company);
  }
  onEdit( company :Company){
    this.EditCompany.emit(company);
  }
  slectCompany(company : Company){
    this.SelectCompany.emit(company);
  }
}
