import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartDataService } from '../cart-data.service';
import { IngredientService } from '../ingredient.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  public toppings: any = [];
  public cart: any = [];
  public qty: any = [];
  public price: any = [];
  public cost: any = [];
  public priceTemp: any;
  email: any;
  user: any;

  value:any = 1;
  constructor(private cartService: CartService, private loginService: LoginService,
    private router: Router, private toastr: ToastrService, public cartdata: CartDataService, private ingredientService:IngredientService) { }

  ngOnInit(): void {
    //console.log('ngOnInit called')
    this.email = this.loginService.user.email;
    this.user = {
      email: this.email
    }
    this.cartService.getCartItems(this.user);
    setTimeout(()=>{
      this.cartdata.getTotal();
    },500);
    /* setTimeout(() => {
      {
        this.qty = this.cartdata.getQty();
        this.cost = this.cartdata.getCost();
        this.price = this.cartdata.getPrice();
        this.cart = this.cartdata.getCart();
        this.toppings = this.cartdata.getToppings();

        console.log('qty is ' + this.qty);
        console.log('cost is ' + this.cost);
        console.log('cart is ' + this.cart);
        console.log('price is ' + this.price);
      }
    }, 500); */

  }

  update(data, i) {
    console.log('Inside update method in cart.component, i is ' + i);
    console.log('data is ' + data);
    data.quantity = this.cartdata.qty[i];
    this.cartService.update(data);
    this.cartdata.price[i] = this.cartdata.cost[i] * this.cartdata.qty[i];
    console.log('price is ' + this.cartdata.price);
    this.cartdata.getTotal();
  }

  // updateTopping(val,data, i, j) {
  //   console.log('Inside updateTopping in cart.component, data is '+data);
  //   // data.topping_quantity = this.cartdata.toppings[i][j];
  //   var obj = {
  //     id:val.id,
  //     topping_quantity:this.cartdata.toppings[i] as number[]
  //   }
  //   console.log('obj.id is ',val.id,'\nobj.topping_quantity is ',this.cartdata.toppings[i]);
  //   var quan = val.topping_quantity[j];
  //   this.cartService.updateTopping(obj);
  //   console.log('Ingredient name is ',data);
  //   console.log('Ingredient name is ',data.trim());
  //   this.ingredientService.getIngredientPrice(data.trim());
  //   var cost:number;
  //   setTimeout(()=>{
  //     cost = this.ingredientService.getPrice();
  //     this.cartdata.price[i] += (this.cartdata.toppings[i][j]-quan)*cost;
  //   },500)
  // }

  updateTopping(val,data, i, j) {
    console.log('Inside updateTopping in cart.component, data is '+data);
    // data.topping_quantity = this.cartdata.toppings[i][j];
    this.ingredientService.getIngredientPrice(data.trim());
    var cost:number;
    setTimeout(()=>{
      var quan = val.topping_quantity[j];
      cost = this.ingredientService.getPrice();
      this.cartdata.price[i] += (this.cartdata.toppings[i][j]-quan)*cost;

      var pri = this.cartdata.price[i];
      var obj = {
        id:val.id,
        topping_quantity:this.cartdata.toppings[i] as number[],
        price:pri
      }
      console.log('Inside updateTopping in cart.component, updated price is '+this.cartdata.price[i]);
      console.log('obj.id is ',val.id,'\nobj.topping_quantity is ',this.cartdata.toppings[i]);
      
      this.cartService.updateTopping(obj);
      console.log('Ingredient name is ',data);
      console.log('Ingredient name is ',data.trim());
      this.cartdata.getTotal();
    },500)
    
  }

  delete(data) {
    console.log('Inside delete method in cart.component');
    //debugger;
    this.cartService.delete({ id: data.id, email: this.loginService.user.email});
    setTimeout(() => {
      this.cartdata.getTotal();
    },500)

    /* setTimeout(() => {
      //this.router.navigate(['cart']);
      console.log('Login Flag is ' + this.loginService.flag + ', emailid is ' + this.loginService.user.email);
      this.toastr.success('Item removed from cart');
    }, 1000); */

  }

}










