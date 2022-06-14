import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/Models/MarketModels/Product.model';
import { ProductService } from 'src/app/service/Market/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product : Product ;
  imageCount : number =0;
  
  constructor(private productService : ProductService , private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.productService.GetProduct(this.route.snapshot.params['id']).subscribe(resp=>{this.product=resp;});
  }
  slecectImage(idx : number){
    this.imageCount = idx;
  }

}
