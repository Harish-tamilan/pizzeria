import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  text:any="Login";

  constructor(public loginService:LoginService,private toastr:ToastrService,private router:Router) { }

  ngOnInit(): void {
    if(this.loginService.flag==1)
    {
      this.text = this.loginService.user.email;
      console.log('text is '+this.text);
    }
  }

  ngOnChange(){
    if(this.loginService.flag==1)
    {
      this.text = this.loginService.user.name;
    }
  }

  logout(){
    this.loginService.setFlag(0);
    this.toastr.success('Logout Success');
    this.router.navigate(['login']);
  }

}
