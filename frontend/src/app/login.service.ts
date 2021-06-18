import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';
import { CartDataService } from './cart-data.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private postURL:string = "http://localhost:5001/user/searchUser";
  private logoutUrl:string = "http://localhost:5001/user/logout";

  flag:any=0;
  user:any;

  constructor(private httpClient:HttpClient, private router:Router, private cartdataService:CartDataService) { }

  login(data){
    this.user = data;
    console.log('inside login in login.service ',data);
    this.httpClient.post(this.postURL,data)
    .subscribe((data:any)=>{
      console.log('login Success');
      if(data.message=='Success')
      {
        this.flag = 1;
        this.router.navigate(['home']);
      }
      else
      {
        this.flag = 0;
      }
    })
  }

  logout(){
    this.cartdataService.total = 0;
    console.log('Inside logout in login.service');
    this.httpClient.post(this.logoutUrl,{})
    .subscribe((data:any) => {
      console.log('Inside subscribe in logout');
    })
  }

  getFlag()
  {
    return this.flag;
  }

  setFlag(flag)
  {
    this.flag = flag;
  }
}
