import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { BuildService } from '../build.service';
import {ToastrService} from 'ngx-toastr';
import {CartService} from '../cart.service';
import {LoginService} from '../login.service';

@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.css']
})
export class BuildComponent implements OnInit {

  public ingredients:any

  toppings:any = [];

  toppings_quantity:any = [];

  id:any;

  pizza:any;

  type:any;

  flag:any;

  email:any;

  constructor(private buildService:BuildService, private cartService:CartService, private toastr:ToastrService, 
    private loginService:LoginService) 
  { }

  cost:any = 0;
  
  ngOnInit(): void {
    this.buildService.getAllIngredients()
    .subscribe((data)=>{
      this.ingredients = data;
      console.log(this.ingredients);
    })
  }

  addCost(n,name,e)
  {
    console.log('Inside addCost method');
    console.log('Topping name is '+name);
    if(e.target.checked)
    {
      this.cost += n;
      this.toppings.push(name);
    }
    else
    {
      this.cost -= n;
      this.toppings.forEach( (item, index) => {
        if(item === name) this.toppings.splice(index,1);
      });
    }
  }

  build()
  {
    this.id = "id-"+new Date();
    for(var i:number = 0;i<this.toppings.length;i++)
    {
      this.toppings_quantity[i] = 1;
    }
    this.email = this.loginService.user.email;
    console.log(this.toppings);
    console.log(this.id);
    if(this.toppings.includes('Chicken'))
    {
      this.type = 'non-veg';
    }
    else
    {
      this.type = 'veg';
    }

    this.pizza = {
      id:this.id,
      type:this.type,
      price:this.cost,
      email:this.email,
      name:'Custom Build Pizza',
      image:"https://thumb9.shutterstock.com/display_pic_with_logo/376831/127528958/stock-photo-delicious-italian-pizza-over-white-127528958.jpg",
      topping:this.toppings,
      topping_quantity:this.toppings_quantity,
      quantity:1
    }

    this.cartService.addToCart(this.pizza);

    setTimeout(()=>this.flag = this.cartService.getFlag(),500);
    
    //console.log('Flag is '+this.flag)
    setTimeout(() => {if(this.flag==1)
    {
      console.log('Inside if flag')
      this.toastr.success("Added to Cart");
    }},500);

  }

}
