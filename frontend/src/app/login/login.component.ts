import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:any;
  password:any;
  flag:any;
  user:any;

  constructor(private loginService:LoginService, private toastr:ToastrService, private router:Router) { }

  ngOnInit(): void {
  }

  login(){
    console.log('Inside login method in login.component');
    this.user={
      email:this.email,
      password:this.password
    }
    this.loginService.login(this.user);

    setTimeout(()=>{
      this.flag = this.loginService.getFlag();
      if(this.flag==1)
      {
        this.toastr.success('Login Successful');
        this.router.navigateByUrl('../nav');
      }
      else
      {
        this.toastr.error('Invalid Username/password');
      }
    },500)
  }

}
