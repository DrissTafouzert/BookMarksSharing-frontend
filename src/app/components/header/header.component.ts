import { Component, OnInit, Output } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthService } from 'src/app/services/authentification/auth.service';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post/post.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit 
{ 
  username:string
  isLoggedIn:boolean
  posts:Post[]
  searchForm:FormGroup
  constructor(private router:Router,
              private authService:AuthService,
              private postService:PostService) 
              { 
                this.searchForm=new FormGroup(
                  {
                    postName:new FormControl('',Validators.required)
                  }
                )
              }

  ngOnInit(): void 
  {
    this.authService.username.subscribe(result=>{this.username=result})
    this.authService.loggedIn.subscribe(result=>{this.isLoggedIn=result})
    this.username=this.authService.getUsername()
    this.isLoggedIn=this.authService.isLoggedIn()
    this.searchForm=new FormGroup(
      {
        postName:new FormControl('',Validators.required)
      }
    )
  }
  logOut()
  {
    this.authService.logOut()
    this.isLoggedIn=false
    this.username=null
    this.router.navigate([''])
  }
  goToProfile()
  {
    this.router.navigate([''])
  }
  searchByPostTitle()
  {
    let postName=this.searchForm.get('postName').value
    this.postService.searchPostByTitle(postName).subscribe()
  }

}
