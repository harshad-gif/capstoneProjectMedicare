import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from '../model/file-handle.model';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessService {

  constructor(
    private sani:DomSanitizer
  ) { }

  public createImage(product:Product){
    const productImage:any[] = product.productImage
    const productImageHandle:FileHandle[] = []

    for(let i=0;i<productImage.length;i++){
      const imgFileData = productImage[i]
      const imgblob = this.picbyteToBlob(imgFileData.picByte, imgFileData.type)
      
      const imageFile = new File([imgblob],imgFileData.name,{type:imgFileData.type})

      const finalFileHandle:FileHandle={
        file:imageFile,
        url:this.sani.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      }
      productImageHandle.push(finalFileHandle)
    }
    product.productImage = productImageHandle
    return product
  }

  public picbyteToBlob(picBytes:any,imageType:any){
    const byteString = window.atob(picBytes)
    const arrayBuffer = new ArrayBuffer(byteString.length)
    const int8Array = new Uint8Array(arrayBuffer)

    for(let i=0;i<byteString.length;i++){
      int8Array[i] = byteString.charCodeAt(i)

    }

    const blob = new Blob([int8Array],{type:imageType})
    return blob
  }
}
