import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  flag:any;
  private postURL:string = "http://localhost:5001/user/register";

  constructor(private httpClient:HttpClient) { }

  signUp(data){
    console.log('inside signUp in signup.service')
    this.httpClient.post(this.postURL,data)
    .subscribe((data:any)=>{
      console.log('Signup result '+data.message);
      if(data.message=='User Registered')
      {
        this.flag = 1;
      }
      else
      {
        this.flag = 0;
      }
    })
  }

  getFlag(){
    return this.flag;
  }
}
