import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { map,Observable, of } from 'rxjs';
import { Product } from '../model/product.model';
import { ImageProcessService } from './image-process.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<Product> {

  constructor(
    private productSer:ProductService,
    private imageProcess:ImageProcessService
  ) { }
  resolve(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
    ):Observable<Product>{
    const id:any = route.paramMap.get("productId");

    if(id){

      return this.productSer.getProductId(id)
      .pipe(
        map(p=>this.imageProcess.createImage(p))
      )
      
    }else{

      return of(this.getProduct())
    }

  }

  getProduct(){
    return{
   
        productId:'',
        productName: "",
        productCategory: "",
        productDescription: "",
        productPrice: 0,
        discountPrice: 0,
        productImage: [],
        active:1,
       
      
    }
  }
}


