import { Component, OnInit } from '@angular/core';
import {CartService} from '../cart.service';
import {LoginService} from '../login.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-pizzacart',
  templateUrl: './pizzacart.component.html',
  styleUrls: ['./pizzacart.component.css']
})
export class PizzacartComponent implements OnInit {

  public cart:any = [];
  public qty:any = [];
  public price:any = [];
  public cost:any = [];
  public priceTemp:any;
  email:any;
  user:any;

  constructor(private cartService:CartService, private loginService:LoginService, 
    private router:Router, private toastr:ToastrService) { }

  ngOnInit(): void {
    //console.log('ngOnInit called')
    this.email = this.loginService.user.email;
    this.user={
      email:this.email
    }
    this.cartService.getCartItems(this.user);
    setTimeout(()=>{
      {
        this.qty = this.cartService.getQty();
        this.cost = this.cartService.getCost();
        this.price = this.cartService.getPrice();
        this.cart = this.cartService.getCart();
        console.log('qty is '+this.qty);
        console.log('cost is '+this.cost);
        console.log('cart is '+this.cart);
        console.log('price is '+this.price);
      }
    },500);
    
  }

  update(data,i){
    console.log('Inside update method in cart.component, i is '+i);
    console.log('data is '+data);
    data.quantity = this.qty[i];
    this.cartService.update(data);
    this.price[i] = this.cost[i]*this.qty[i];
    console.log('price is ' + this.price);
    
  }

  delete(data){
    console.log('Inside delete method in cart.component');
    //debugger;
    this.cartService.delete({id:data.id});
    setTimeout(()=>{
      this.router.navigate(['cart']);
      console.log('Login Flag is '+this.loginService.flag+', emailid is '+this.loginService.user.email);
      this.toastr.success('Item removed from cart');
    },1000)
    
  }

}
