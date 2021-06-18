import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  private postURL:any = "http://localhost:5001/ingredient/getIngredientPrice";

  price:any;

  constructor(private httpClient:HttpClient) { }

  getIngredientPrice(data){
    var query = {
      name:data
    }
    this.httpClient.post(this.postURL,query)
    .subscribe((data:any)=>{
      console.log('getIngredientPrice method in ingredient.service, data received is ',data);
      this.price = data.price;
    })
  }

  getPrice()
  {
    return this.price;
  }
}
