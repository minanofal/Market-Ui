import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { Category } from 'src/app/Models/MarketModels/category.model';
import { Company } from 'src/app/Models/MarketModels/Company.model';
import { Type } from 'src/app/Models/MarketModels/type.model';
import { TypeForm } from 'src/app/Models/MarketModels/TypeForm.model';

@Component({
  selector: 'app-type-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.css']
})
export class TypeListComponent implements OnInit {
  roles = localStorage.getItem("roles");
  rolescjeck? :boolean;
  @Input() types : Type[];
  @Input() companies : Company[];
  @Input() selectedCategory : Category;
  @Output() newtype : EventEmitter<TypeForm>= new EventEmitter();
  @Output() DeletedType : EventEmitter<Type> = new EventEmitter();
  @Output() EditeType : EventEmitter<TypeForm> = new EventEmitter();
  @Output() selectedType : EventEmitter<Type> = new EventEmitter();
  @Output() AllTypes : EventEmitter<any> = new EventEmitter();
  @Output() NewCompany : EventEmitter<any> = new EventEmitter();
  @Output() deleteCompany : EventEmitter<Company> = new EventEmitter();
  @Output() editCompany : EventEmitter<Company> = new EventEmitter();
  @Output() selectCompany : EventEmitter<Company> = new EventEmitter();
  addForm : boolean;
  editchicker : boolean =false;
  editType:Type;
  displayanimation : boolean;
  showEdit :boolean;
  displayanimationEdit : boolean;
  Selectedid : string;
  alltype : boolean = true;
  @Input() selectedid :string;

  constructor() { }

  ngOnInit(): void {
    this.rolescjeck=this.roles?.includes("Admin");
  }

  
  AddForm(){
    this.displayanimation =!this.displayanimation;
    if( this.addForm == true){
      setTimeout(()=>{
        this.addForm = false;
      },500);
    }else{
      this.addForm = true;
  }
    }
    NewType(event : TypeForm){
      this.newtype.emit(event);
      this.displayanimation =!this.displayanimation;
      if( this.addForm == true){
        setTimeout(()=>{
          this.addForm = false;
        },500);
      }else{
        this.addForm = true;
    }
    }
    DeleteType(type:Type){
      this.DeletedType.emit(type);
    }
    EditType(type : Type){
      this.editType = type;
      if(!this.editchicker){
        this.editchicker=true;
      this. displayanimationEdit=!this. displayanimationEdit;
      if( this.showEdit == true){
        setTimeout(()=>{
          this.showEdit = false;
        },500);
      }else{
        this.showEdit = true;
    }}
    }

    edittype(event : TypeForm){
      this.editchicker=false;
      this.EditeType.emit(event);
      this. displayanimationEdit=!this. displayanimationEdit;
      if( this.showEdit == true){
        setTimeout(()=>{
          this.showEdit = false;
        },500);
      }else{
        this.showEdit = true;
    }
    }
    CloseEdit(){
      this.editchicker=false;
      this. displayanimationEdit=!this. displayanimationEdit;
        setTimeout(()=>{
          this.showEdit = ! this.showEdit;
        },500);
    }
    selecType(type : Type){
      this.alltype = false;
      this.Selectedid = type.id;
      this.selectedType.emit(type);
    }
    AllType(){
      this.alltype=true;
      this.AllTypes.emit();
    }
    newcompany(){
      this.NewCompany.emit()
    }
    ondeletecompany(event :Company){
        this.deleteCompany.emit(event);
    }
    oneditcompany(event : Company){
      this.editCompany.emit(event);
    }
    SelectCompany(event : Company){
    
      this.selectCompany.emit(event);
    }
}
