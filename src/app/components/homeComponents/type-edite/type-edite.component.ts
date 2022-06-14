import { Component, Input, OnInit, Output ,EventEmitter  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/Models/MarketModels/category.model';
import { Type } from 'src/app/Models/MarketModels/type.model';
import { TypeForm } from 'src/app/Models/MarketModels/TypeForm.model';

@Component({
  selector: 'app-type-edite',
  templateUrl: './type-edite.component.html',
  styleUrls: ['./type-edite.component.css']
})
export class TypeEditeComponent implements OnInit {
  @Input() selectedCategory : Category;
  @Input() editType : Type;
  @Output() EditType : EventEmitter<TypeForm> = new EventEmitter();
  @Output() Cancel : EventEmitter<any> =new EventEmitter();
  type : TypeForm ={name:'',categoryId:''};
  form : FormGroup = new FormGroup({
    name : new FormControl('', Validators.required)
  });

  get Name(){
    return this.form.get('name');
  }
  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(){
    this.type.id = this.editType.id;
    this.type.categoryId = this.selectedCategory.id;
    this.type.name = this.editType.name;
    this.EditType.emit(this.type);
  }
  cancel(){
    this.Cancel.emit();
  }

}
