import { FileHandle } from "./file-handle.model";


export interface Product{
    productId: any,
    productName:string,
    productCategory:string,
    productDescription:string,
    productPrice:number,
    discountPrice:number,
    productImage:FileHandle[],
    active:number
}