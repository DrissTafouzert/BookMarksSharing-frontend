import { Component, OnInit } from '@angular/core';
import { RegisterRequest } from 'src/app/models/registerRequest/register-request';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authentification/auth.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
            private authService:AuthService,
            private toastService:ToastService,
            private modalService:NgbModal) 
  {
    this.registerRequest={
      userName:'',
      email:'',
      password:''
    }
  }

  ngOnInit(): void 
  {
    this.registerForm=new FormGroup({
      username:new FormControl('',Validators.required),
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',Validators.required),
      confirmPassword:new FormControl('',[Validators.required])
    });
    this.registerForm.setValidators(this.MustMatch)
  }

  signUp(content)
  {
    this.registerRequest.email=this.registerForm.get('email').value
    this.registerRequest.userName=this.registerForm.get('username').value
    this.registerRequest.password=this.registerForm.get('password').value
    this.authService.signup(this.registerRequest)
                    .subscribe(result=>
                      {
                        this.openModal(content) 
                        this.toastService.showSucess("Your account created successfuly")
                      },
                      error=>
                      {                                             
                        this.toastService.showError("Network error, check your connexion!")                      
                      })
  }
  
  MustMatch(control:AbstractControl): { [key:string]: boolean} | null
  {
      if(control.get('password').value!==control.get('confirmPassword').value)
      {
        return {'notMatch':true}
      }
      else
      {
        return null
      }     
  }
  openModal(content) 
  {
    this.modalService.open(content, { centered: true})
  }
}

