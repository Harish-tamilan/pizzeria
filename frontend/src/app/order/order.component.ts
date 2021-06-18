import { Component, OnInit } from '@angular/core';
import {OrderService} from '../order.service';
import {CartService} from '../cart.service';
import {ToastrService} from 'ngx-toastr';
import {LoginService} from '../login.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  public pizza:any = [];
  flag:any;
  order:any;//which is to be added to cart
  email:any;
  topping_quantity:any = [];

  constructor(private orderService:OrderService, private cartService:CartService, 
    private toastr:ToastrService, private loginService:LoginService) 
  { }

  ngOnInit(): void {
    this.orderService.getPizzas()
    .subscribe((data:any)=>{
      this.pizza = data;
      console.log(this.pizza);
      if(data.data=='Not Logged In')
      {
        this.flag = 1;
      }
      else
      {
        this.flag = 0;
      }
    })
    setTimeout(()=>{
      if(this.flag==0)
        this.toastr.error('Not Logged In');
    })
  }

  addToCart(data)
  {
    console.log('Inside addToCart');
    data.quantity = 1;

    for(var i:number=0;i<data.topping.length;i++)
    {
      this.topping_quantity[i] = 1;
    }
    
    this.email = this.loginService.user.email;
    this.order={
      id:data.id,
      type:data.type,
      name:data.name,
      price:data.price,
      email:this.email,
      image:data.image,
      topping:data.topping,
      topping_quantity:this.topping_quantity,
      quantity:1
    }

    this.cartService.addToCart(this.order);
    
    setTimeout(() => {
      this.flag = this.cartService.getFlag();
      if(this.flag==1)
      {
        console.log('Inside if flag')
        this.toastr.success("Added to Cart");
      }
      else if(this.flag==2)
      {
        this.toastr.success("Cart Item Updated");
      }
      else
      {
        this.toastr.warning('Error');
      }
    },500);
  }

}
