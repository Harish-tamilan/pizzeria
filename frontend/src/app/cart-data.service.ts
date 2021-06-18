import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class CartDataService {
    cart: Array<any> = [];
    qty: Array<any> = [];
    price: Array<any> = [];
    cost: Array<any> = [];
    toppings: Array<Array<number>> = [];
    total:any = 0;

    constructor() {}

    setCart(data) {
        this.cart = data;
        // console.log('cart length is '+this.cart.length);
        // console.log(this.cart);
        if (this.cart.length > 0) {
          console.log('Inside if');
          for (var i: number = 0; i < this.cart.length; i++) {
            this.qty[i] = this.cart[i].quantity;
            this.cost[i] = this.cart[i].price;
            this.price[i] = this.qty[i] * this.cost[i];
            var temp:Array<number> = [];
            this.toppings[i] = temp;
            var obj: any = {};
            console.log('toppings are ', this.cart[i].topping);
            console.log('topping quantities are ', this.cart[i].topping_quantity);
            for (var j: number = 0; j < this.cart[i].topping.length; j++) {
              var temp2:any = this.cart[i].topping[j];
              var quan:any = this.cart[i].topping_quantity[j];
              this.toppings[i][j] = quan;
            }
            this.total += this.price[i];
            // console.log(this.qty[i]);
            // console.log(this.cost[i]);
            // console.log(this.price[i]);
          }
          console.log('toppings array is ',this.toppings);
        }
    }

    deleteCart(id) {
        const index = this.getDataIndexById(id);
        if (index >= 0) {
            this.cart.splice(index, 1);
            this.qty.splice(index, 1);
            this.price.splice(index, 1);
        }
    }

    getTotal(){
        this.total = 0;
        for(var i:number = 0;i<this.price.length;i++)
            this.total += this.price[i];
    }

    setPrice(data)
    {
        this.price = data;
    }

    getDataIndexById(id): number {
        return this.cart.findIndex(d => d.id === id);
    }

    getQty() {
        return this.qty;
    }

    getPrice() {
        return this.price;
    }

    getCost() {
        return this.cost;
    }

    getCart() {
        return this.cart;
    }

    getToppings() {
        return this.toppings;
    }
}