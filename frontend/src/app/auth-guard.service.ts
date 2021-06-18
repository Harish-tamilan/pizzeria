import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import {LoginService} from './login.service';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private loginService:LoginService, private toastr:ToastrService, private router:Router) { }

  canActivate():boolean
  {
    if(this.loginService.getFlag()==1)
      return true;
    else
    {
      this.toastr.error('Need to login');
      this.router.navigate(['login']);
      return false;
    }
  }
}
