import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.css']
})
export class ShowImageComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any
  ){}

  ngOnInit():void{
    this.getImage()
   }
 
   getImage(){
     console.log(this.data)
   }
}
