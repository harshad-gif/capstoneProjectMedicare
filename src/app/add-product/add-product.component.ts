import { HttpErrorResponse } from '@angular/common/http';
import { Component,OnInit,Inject } from '@angular/core';
import { FileHandle } from '../model/file-handle.model';
import { Product } from '../model/product.model';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../services/product.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

 

  file:any
  actionBtn = true
  text = true
  
  product:Product = {
    productName: "",
    productCategory: "",
    productDescription: "",
    productPrice: 0,
    discountPrice: 0,
    productImage: [],
    active:1,
    productId: 0
  }

  constructor(
    private fb:FormBuilder,
   // @Inject(MAT_DIALOG_DATA) public editData:any,
    private productService:ProductService,
    
    private sani:DomSanitizer,
    private route:ActivatedRoute
    ){}
  ngOnInit(): void {

      this.product = this.route.snapshot.data['product']

      if(this.product && this.product.productId){
        this.actionBtn = false
        this.text  = false
      }
      
      
  }

  addProduct(productForm:NgForm){
    const productFormData = this.prepareFormData(this.product)
     this.productService.addProduct(productFormData)
     .subscribe(
      (res:Product)=>{
        console.log(res)
        
        productForm.reset()
       
      },
      (error:HttpErrorResponse)=>{
        console.log(error)
      }
     )
  }

  prepareFormData(product:Product):FormData{
    const formData = new FormData()
    formData.append(
      'product',
      new Blob([JSON.stringify(product)],{type:'application/json'})
    )

    for(var i=0;i<product.productImage.length;i++){
      formData.append(
        'imageFile',
        product.productImage[i].file,
        product.productImage[i].file.name
      )
    }
    return formData
  }

  onFileSelected(event:any){
    if(event.target.files){
      const file = event.target.files[0]
      const fileHandle:FileHandle={
        file:file,
        url:this.sani.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }
      this.product.productImage.push(fileHandle)
    }
  }

  // updateProduct(){
  //   this.productService.updateProduct(this.addProductForm.value, this.editData.productId)
  //   .subscribe({
  //     next:(res)=>{
  //       this.addProductForm.reset
  //       this.dialogRef.close()
  //       console.log(res)
  //       alert("updated")
  //     },
  //     error:(error)=>{
  //       console.log(error)
  //       alert("not updated")
  //     }
  //   })
  // } 
}
