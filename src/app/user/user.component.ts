import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../model/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

 
  constructor(
    private userSer:UserService,
    private route:ActivatedRoute
  ){}

  ngOnInit(): void {
      this.forUser()
  }

  forUser(){
    this.userSer.forUser().subscribe(
      (res)=>{
        console.log(res)
        //this.msg = res
      },
      (error)=>{
        console.log(error)
      }
    )
  }
}
