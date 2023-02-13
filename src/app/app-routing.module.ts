import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth/auth.guard';
import { BuyComponent } from './buy/buy.component';
import { CartComponent } from './cart/cart.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BuyProductResloveService } from './services/buy-product-reslove.service';
import { ProductResolverService } from './services/product-resolver.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserComponent } from './user/user.component';
import { ViewProductComponent } from './view-product/view-product.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'signUp',component:SignUpComponent},
  {path:'cart',component:CartComponent},
  {path:"confirm",component:ConfirmationComponent},
  {path:'view',component:ViewProductComponent,resolve:{product:ProductResolverService}},
  {path:'add',component:AddProductComponent,resolve:{product:ProductResolverService}},
  {path:'buy',component:BuyComponent, 
  resolve:{
    productDetails:BuyProductResloveService
  }
  },
  {path:'user',component:UserComponent,canActivate:[AuthGuard],data:{roles:['User']}},
  {path:'admin',component:AdminComponent,canActivate:[AuthGuard],data:{roles:["Admin"]}},
  {path:'forbidden',component:ForbiddenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
