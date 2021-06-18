import { Component, OnInit } from '@angular/core';
import {SignupService} from '../signup.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  gender:String;
  name:String;
  email:String;
  password:String;
  mobile:Number;
  user:any;
  flag:any;

  constructor(private signUpService:SignupService, private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  SignUp(formdata:any)
  {
    console.log("Username : "+formdata.name);
    this.name = formdata.name;
    this.password = formdata.pwd;
    this.email =  formdata.email;
    this.gender = formdata.optradio;
    this.mobile = formdata.mob;
    console.log("Password : "+formdata.pwd);
    console.log("Gender : "+formdata.optradio);
    this.user = {
      email:this.email,
      name:this.name,
      password:this.password,
      phone:this.mobile,
      gender:this.gender,
      verified:true,
    }
    console.log(this.user);
    this.signUpService.signUp(this.user);
    setTimeout(()=>{
      this.flag = this.signUpService.getFlag();
      console.log('Flag is '+this.flag);
      if(this.flag==1)
      {
        this.toastr.success('Registered Successful');
      }
      else
      {
        this.toastr.error('EmailId exist');
      }
    },500)
  }

}
