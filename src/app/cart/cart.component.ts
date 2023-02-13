import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../model/product.model';
import { ImageProcessService } from '../services/image-process.service';
import { ProductService } from '../services/product.service';
import { map, Observable } from 'rxjs';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  cartDetails:any[]=[]

  constructor(
   private productSer:ProductService,
   private router:Router,
  
  ){}

  ngOnInit(): void {
    
    this.getAllCart()
  }

  getAllCart(){
    this.productSer.getAllCart()
    .subscribe(
      (res:any)=>{
        console.log(res)
        this.cartDetails=res
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  
  
  deleteCart(cartId:number){
    this.productSer.deleteCart(cartId)
    .subscribe({
     next:(res)=>{
       console.log(res)
       this.getAllCart()
     },
     error:(err)=>{
       console.log(err)
     }
    })
  }

  buy(productId:number){
    this.router.navigate(["/buy",{
     isSingleProduct:true,id:productId
    }])
 }

 checkout(){
  this.router.navigate(["/buy",{
   isSingleProduct:false,id:0
  }])
}
}
