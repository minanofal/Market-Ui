import { ProductImage } from "./ProductImages";

export interface Product{
    id : string;
    name : string;
    price : number;
    description :string;
    Updated : string;
    totlaCount : number;
    type : string;
    typeId : string;
    category : string;
    categoryId : string;
    company : string;
    companyId : string;
    productImages : ProductImage [];
    countimage : number ;
 }