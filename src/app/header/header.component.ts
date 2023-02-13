import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderDetails } from '../model/orderDetails.model';
import { User } from '../model/user.model';
import { UserAuthService } from '../services/user-auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  
  user:any=null

constructor(
  private userAuth:UserAuthService,
  public userSer:UserService,
  private router:Router
  ){}

  public isLoggedIn(){
    return this.userAuth.isLoggedIn()
  }

  public logout(){
    this.userAuth.clear()
    this.router.navigate(['/home'])
  }

 
  

}
