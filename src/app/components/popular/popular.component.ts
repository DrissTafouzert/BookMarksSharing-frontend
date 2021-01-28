import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post/post.service';
import { SubredditService } from 'src/app/services/subreddit/subreddit.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent implements OnInit {

  posts:Post[]
  constructor(private postService:PostService,
              private toastService:ToastService,
              private router:Router) { }

  ngOnInit(): void 
  {
    this.getAllPosts()
  }

  getAllPosts()
  {
    this.postService.getAll().subscribe(
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
