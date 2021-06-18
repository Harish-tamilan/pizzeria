import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BuildService {

  private serviceURL:any = "http://localhost:5001/ingredient/getAllIngredients";

  constructor(private httpClient:HttpClient) { }

  getAllIngredients()
  {
    return this.httpClient.get(this.serviceURL);
  }
}
