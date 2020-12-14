import { Component, OnInit } from '@angular/core';
import { RegisterRequest } from 'src/app/models/registerRequest/register-request';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authentification/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit 
{
  registerRequest:RegisterRequest;
  public registerForm:FormGroup;
  constructor(private router:Router,
            private authService:AuthService) 
  {
    this.registerRequest={
      username:'',
      email:'',
      password:''
    }
  }

  ngOnInit(): void 
  {
    this.registerForm=new FormGroup({
      username:new FormControl('',Validators.required),
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',Validators.required)
    });
  }
  signUp()
  {
    this.registerRequest.email=this.registerForm.get('email').value
    this.registerRequest.username=this.registerForm.get('username').value
    this.registerRequest.password=this.registerForm.get('password').value
    this.authService.signup(this.registerRequest)
                    .subscribe(result=>
                      {
                        this.router.navigate(['/login'])
                      },
                      error=>
                      {
                        console.log(error);                        
                      })
  }

}
