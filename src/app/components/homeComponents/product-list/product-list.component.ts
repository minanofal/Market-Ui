import { Component, Input, OnInit, Output ,EventEmitter } from '@angular/core';
import { Product } from 'src/app/Models/MarketModels/Product.model';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Input() products : Product[];
  @Output() deleteproduct : EventEmitter<Product> = new EventEmitter();
  roles = localStorage.getItem("roles");
  rolescjeck? :boolean;
  constructor() { }

  ngOnInit(): void {
    this.rolescjeck=this.roles?.includes("Admin");
  }
  leftrow(product : Product){
    
    if(product.countimage -1 >= 0){
      product.countimage--;
    }
    else{
      product.countimage = product.productImages.length;
    }
  }
  rightrow(product : Product){
    
    if(product.countimage +1 < product.productImages.length){
      product.countimage++;
    }
    else{
      product.countimage =0;
    }
  }
  deleteProduct(product : Product){
    this.deleteproduct.emit(product);
  }
}
