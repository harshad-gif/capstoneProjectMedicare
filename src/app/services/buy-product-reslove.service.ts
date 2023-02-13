import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Product } from '../model/product.model';
import { ImageProcessService } from './image-process.service';
import { ProductService } from './product.service';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BuyProductResloveService implements Resolve<Product[]>  {

  constructor(
    private productSer:ProductService,
    private imageSer : ImageProcessService
    ) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product[] | Observable<Product[]> | Promise<Product[]> {

        const id = route.paramMap.get('id')
        const isSingleProduct = route.paramMap.get('isSingleProduct')
        return this.productSer.getProductDetail(isSingleProduct,id)
        .pipe(
            map(
                (x:Product[],i)=>x.map(((product:Product)=>this.imageSer.createImage(product)))
            )
        )
    }
}
