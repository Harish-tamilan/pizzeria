import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartDataService } from './cart-data.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private serviceURL: any = "http://localhost:5001/cart/getAllCarts";

  private postURL: any = "http://localhost:5001/cart/register";

  private updateURL: any = "http://localhost:5001/cart/updateCart";

  private updateToppingURL: any = "http://localhost:5001/cart/updateTopping";

  private deleteURL: any = "http://localhost:5001/cart/delete";

  private getCostURL:any = "http://localhost:5001/cart/getTotal"

  flag: number;

  constructor(private httpClient: HttpClient, private cartdata: CartDataService) { }

  getCartItems(data) {
    console.log('Inside getCartItems in cart.service ', data);
    return this.httpClient.post(this.serviceURL, data)
      .subscribe((data: any) => {
        this.cartdata.setCart(data.data);
      });
  }

  addToCart(data) {
    console.log('inside addToCart method in cart.service.ts')
    this.httpClient.post(this.postURL, data)
      .subscribe((data: any) => {
        console.log("Added to Cart ", data);
        if (data.message == 'Cart Registered')
          this.flag = 1;
        else if (data.message == 'Cart Item Updated')
          this.flag = 2;
        else
          this.flag = 0;
      })

  }

  getFlag(): number {
    console.log('Flag valye in cart.service' + this.flag)
    return this.flag;
  }

  update(data) {
    this.httpClient.post(this.updateURL, data)
      .subscribe((data) => {
        console.log('Update Success');
      })
  }

  updateTopping(data) {
    this.httpClient.post(this.updateToppingURL, data)
      .subscribe((data:any) => {
        if(data.message=='SUCCESS')
        console.log('Update Success');
      })
  }

  getCost(data){
    return this.httpClient.post(this.serviceURL, data)
      .subscribe((data: any) => {
        this.cartdata.setPrice(data.data);
      });
  }

  delete(data) {
    this.cartdata.deleteCart(data.id);
    this.httpClient.post(this.deleteURL, data)
      .subscribe((data) => {
        console.log('Delete method in cart.service, data received is ', data);
      })
  }
}
