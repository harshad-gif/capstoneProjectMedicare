import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderDetails } from '../model/orderDetails.model';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public search =new BehaviorSubject<string>(""); 

  constructor(
    private http:HttpClient
  ) { }

  public addProduct(product:FormData){
    return this.http.post<Product>("http://localhost:8080/addProducts",product)
  }
  public getAllProduct(searchKeyword:string=""){
    return this.http.get<Product[]>("http://localhost:8080/getAllProduct?searchkey="+searchKeyword)
    
  }

  public updateProduct(data:any,productId:number){
    return this.http.put<any>("http://localhost:8080/getProduct/"+productId,data)
  }

  public getCategory(data:any,category:string){
    return this.http.get<any>("http://localhost:8080/getProduct/categorize/"+category,data)
  }
  
  public deleteProduct(productId:number){
    return this.http.delete<any>("http://localhost:8080/deleteProduct/"+productId)
  }

  public getProductDetail(isSingleProduct:any, productId:any){

    return this.http.get<Product[]>("http://localhost:8080/getProductDetail/"+isSingleProduct+"/"+productId)
    
  }

  public getProductId(productId:number){
    return this.http.get<Product>("http://localhost:8080/getProductId/"+productId)
  }


 

  public addToCart(productId:number){
    return this.http.get("http://localhost:8080/addCart/"+productId)
   }

   public getAllCart(){
    return this.http.get("http://localhost:8080/getCartDetails")
   }

   deleteCart(cartId:number){
    return this.http.delete("http://localhost:8080/deleteCart/"+cartId)
   }

   public activeProduct(productId:number){
    return this.http.put("http://localhost:8080/enable/"+productId,null)
   }

   public placeOrder(orderDetails:OrderDetails){
    return this.http.post("http://localhost:8080/placeOrder/",orderDetails)
  }

  
}
