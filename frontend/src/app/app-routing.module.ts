import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildComponent } from './build/build.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { SignupComponent } from './signup/signup.component';
import {AuthGuardService} from './auth-guard.service';
import { NavComponent } from './nav/nav.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'order',component:OrderComponent,canActivate:[ AuthGuardService]},
  {path:'build',component:BuildComponent,canActivate:[ AuthGuardService]},
  {path:'cart',component:CartComponent,canActivate:[ AuthGuardService]},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'nav',component:NavComponent}
  //{ path: 'cart', loadChildren: () => import('./pizzacart/pizzacart.module').then(m => m.PizzacartModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
