import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
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
              private subreddit:SubredditService,
              private toastService:ToastService) { }

  ngOnInit(): void 
  {
    this.postService.getByCurrentUser().subscribe(
      result=>
      {
        this.posts=result
      },
      error=>
      {
        this.toastService.showError("Network error")
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
  getAllSubreddit()
  {
    this.subreddit.getAll().subscribe(
      result=>
      {
      },
      error=>
      {
        this.toastService.showError("Network error")
      }
    )
  }

}
