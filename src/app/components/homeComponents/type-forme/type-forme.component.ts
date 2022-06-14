import { Component, Input, OnInit, Output ,EventEmitter  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/Models/MarketModels/category.model';
import { TypeForm } from 'src/app/Models/MarketModels/TypeForm.model';


@Component({
  selector: 'app-type-forme',
  templateUrl: './type-forme.component.html',
  styleUrls: ['./type-forme.component.css']
})
export class TypeFormeComponent implements OnInit {
  @Input() selectedCategory : Category;
  @Output() newType : EventEmitter<TypeForm> = new EventEmitter();
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
    console.log(this.type.name);
    this.type.categoryId = this.selectedCategory.id;
    this.newType.emit(this.type);
  }

}
