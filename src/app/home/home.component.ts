import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../model/product.model';
import { ImageProcessService } from '../services/image-process.service';
import { ProductService } from '../services/product.service';
import { map, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productDetails:any=null

 
 
  constructor(
    private productService:ProductService,
   // private cartService:CartService,
    private router:Router,
    private imageProcess:ImageProcessService
  ){

  }

  ngOnInit():void{
     
    this.getAllProduct()

  
  }

  public getAllProduct(searchkey:string=""){
    this.productService.getAllProduct(searchkey)
     .pipe(
      map((x:Product[],i)=>x.map((product:Product)=>this.imageProcess.createImage(product)))
      )
     .subscribe(
      (resp:Product[])=>{
        console.log(resp)

        this.productDetails = resp
      },
      (error:HttpErrorResponse)=>{
        console.log(error)
      }
     )

  }

  addCart(productId:number){
    this.productService.addToCart(productId)
    .subscribe(
      (res)=>{
        console.log(res)
        this.router.navigate(['/cart'])
      },
      (error)=>{
          console.log(error)
      }
    )
  }

  searchBykeyword(searchkeyword:any){
   this.productDetails = []
   this.getAllProduct(searchkeyword)
  }

  viewProduct(productId:number){
    this.router.navigate(["/view",{productId:productId}])
  }
 
}
