import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private serviceURL:any = "http://localhost:5001/pizza/getAllPizzas";

  constructor(private httpClient:HttpClient) { }

  getPizzas()
  {
    return this.httpClient.get(this.serviceURL);
  }

  
}
