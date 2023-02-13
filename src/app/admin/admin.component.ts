import { Component,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddProductComponent } from '../add-product/add-product.component';
import { Product } from '../model/product.model';
import { ImageProcessService } from '../services/image-process.service';
import { ProductService } from '../services/product.service';
import { UserAuthService } from '../services/user-auth.service';
import { ShowImageComponent } from '../show-image/show-image.component';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  btn:boolean=false
  Enable:string="Enable"
  no = 1


  displayedColumns:string[]= ['position','name','category','price','description','discount','image','action','active']
  dataSource:any

  constructor(
    private productService:ProductService,
    public dialog:MatDialog,
    private router:Router,
    private userAuth:UserAuthService,
    private imageProcess:ImageProcessService
  ){}

  ngOnInit(): void {
    this.getProduct() 
  }

  

  getProduct(){

    this.productService.getAllProduct()
    .pipe(
      map((x:Product[],i)=>x.map((product:Product)=>this.imageProcess.createImage(product)))
    )
    .subscribe({
      next:(res)=>{
        console.log(res)
        
        this.dataSource = res
        
        this.btn = true
       
      }
    })
  }

  

  deleteProduct(productId:number){
    this.productService.deleteProduct(productId)
    .subscribe({
      next:(res)=>{
         console.log(res)
         alert("product Deleted")
         this.getProduct()
      },
      error:()=>{
        alert("product Not Deleted")
      }
    })
  }

  showImage(product:Product){
    console.log(product)
    this.dialog.open(ShowImageComponent,{
      data:{
        images:product.productImage
      },
      height:'40%',
      width:'20%'
    })
  }

  editProduct(productId:number){
    this.router.navigate(["/add",{productId:productId}])
  }

  enable(productId:number){
    this.productService.activeProduct(productId)
    .subscribe(
      (res)=>{
        console.log(res)
        this.getProduct()
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  logout(){
    this.userAuth.clear()
    this.router.navigateByUrl("/header")
  }
}
