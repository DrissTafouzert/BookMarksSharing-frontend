import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';
import { SubredditService } from 'src/app/services/subreddit/subreddit.service';
import { Post } from 'src/app/models/post';
import { ActivatedRoute } from '@angular/router';
import { Subreddit } from 'src/app/models/subreddit';
import { RandomColor } from 'src/app/services/random-color';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-view-subreddit',
  templateUrl: './view-subreddit.component.html',
  styleUrls: ['./view-subreddit.component.css']
})
export class ViewSubredditComponent implements OnInit 
{

  constructor(private route:ActivatedRoute,
    private postService:PostService,
    private subredditService:SubredditService,
    private randomColor:RandomColor,
    private toastService:ToastService) { }

  posts:Post[]
  subreddit_id:number
  subreddit:Subreddit

  ngOnInit():void 
  {
    this.getPostBySubreddit()
  }

  getPostBySubreddit()
  {
    this.getIdSubreddit()
    this.getSubredditById(this.subreddit_id)
    this.postService.getBySubredditId(this.subreddit_id).subscribe(
        result=>
        {
          this.posts=result;
        },
        error=>
        {
          this.toastService.showError("Network error")
        }
    )
  }
  
  getIdSubreddit()
  {
    this.route.params.subscribe(
    result=>
    {
      this.subreddit_id=result.id
    }
    )
  }

  getSubredditById(id:number)
  {
    this.subredditService.getSubredditById(id).subscribe(
    result=>
    {
      this.subreddit=result
      this.subreddit.colorIcon=this.getRandomColor()
    },
    error=>
    {
      this.toastService.showError("Network error")
    }
    )
  }

  joinSubreddit()
  {
    this.subredditService.joinSubreddit(this.subreddit_id).subscribe(
    result=>
    {
      this.toastService.showSucess("You joined "+this.subreddit.name)
    },
    error=>
    {
      this.toastService.showError("You have to be connected to your account, to join this subreddit.")
    }
    )
  }
  
  changeSubreddit(event)
  {
    this.getPostBySubreddit()
  }

  getRandomColor():string
  {
    return this.randomColor.getColor()
  }
}
