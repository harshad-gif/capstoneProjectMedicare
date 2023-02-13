import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDetails } from '../model/orderDetails.model';
import { Product } from '../model/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {

  productDetails : Product[] = []


  orderDetails:OrderDetails={
    fullName:'',
    fullAddress:'',
    contactNumber:'',
    productQuantity:[]
  }

  constructor(
    private productSer:ProductService,
    private activateRoute:ActivatedRoute,
    private router:Router
  ){}

  ngOnInit(): void {
    this.productDetails = this.activateRoute.snapshot.data['productDetails']

    

    this.productDetails.forEach(
      x => this.orderDetails.productQuantity.push(
        {productId:x.productId,quantity:1}
      )
    )

    console.log(this.productDetails)
    console.log(this.orderDetails)
  }

  getQuantity(productId:any){
    const filterProduct = this.orderDetails.productQuantity.filter(
      (productQuantity) => productQuantity.productId === productId
    )
    return filterProduct[0].quantity
  }

  getTotal(productId:number,discountPrice:number){
    const filterProduct = this.orderDetails.productQuantity.filter(
      (productQuantity) => productQuantity.productId === productId
    )
    return filterProduct[0].quantity * discountPrice
  }

  onQuantitChange(q:any,productId:number){
    this.orderDetails.productQuantity.filter(
      (orderProduct) => orderProduct.productId === productId
    )[0].quantity = q
  }

  grandTotal(){
    let total = 0
    this.orderDetails.productQuantity.forEach(
    (productQuantity)=>{
      const price =this.productDetails.filter(product=>product.productId === productQuantity.productId)[0].discountPrice
      total = total + price * productQuantity.quantity
    }
    )
    return total
  }


  public placeOrder(orderForm:NgForm){

    this.productSer.placeOrder(this.orderDetails).subscribe(
      (res)=>{
        console.log(res)
        orderForm.reset
        
        this.router.navigate(["/confirm"])
      },
      (error)=>{
        console.log(error)
      }

    )

  }
}
