import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentification/auth.service';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/models/loginRequest/login-request';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginRequest:LoginRequest
  loginForm:FormGroup
  constructor(private authService:AuthService,
              private route:Router) 
  {
    this.loginRequest={
      userName:'',
      password:'',
    }
  }

  ngOnInit(): void 
  {
    this.loginForm=new FormGroup({
      username:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required)
    })
  }
  logIn()
  {
    this.loginRequest.userName=this.loginForm.get('username').value
    this.loginRequest.password=this.loginForm.get('password').value
    this.authService.login(this.loginRequest).subscribe(result=>
      {
        this.route.navigate(['/'])
        console.log("sussceful")
      })
  }

}
