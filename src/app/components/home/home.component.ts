import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post/post.service';
import { SubredditService } from 'src/app/services/subreddit/subreddit.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit 
{
  posts:Post[]
  constructor(private postService:PostService,
              private toastService:ToastService,
              private router:Router) { }

  ngOnInit(): void 
  {
    this.postService.getByCurrentUser().subscribe(
      result=>
      {
        this.posts=result
      },
      error=>
      {
        this.posts=null
        this.toastService.showError("You are not connected.")
      }
    )
    this.postService.postsSearch.subscribe(
      result=>
      {
        this.posts=result
      },
      error=>
      {
        this.toastService.showError("Network error")
      }
    )
    
  }
  createPost()
  {
    this.router.navigate(['/create-post'])
  }


}
