import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  product:Product

  constructor(
    private actRoute:ActivatedRoute,
    private router:Router,
  ){}

  ngOnInit(): void {
      this.product = this.actRoute.snapshot.data['product']
      console.log(this.product)
  }

  buy(productId:number){
    this.router.navigate(["/buy",{
     isSingleProduct:true,id:productId
    }])
 }
}

