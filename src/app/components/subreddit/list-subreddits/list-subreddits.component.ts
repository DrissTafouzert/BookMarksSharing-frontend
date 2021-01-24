import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';
import { SubredditService } from 'src/app/services/subreddit/subreddit.service';
import { Post } from 'src/app/models/post';
import { ActivatedRoute } from '@angular/router';
import { Subreddit } from 'src/app/models/subreddit';
import { RandomColor } from 'src/app/services/random-color';

@Component({
  selector: 'app-list-subreddits',
  templateUrl: './list-subreddits.component.html',
  styleUrls: ['./list-subreddits.component.css']
})
export class ListSubredditsComponent implements OnInit {

  constructor(private route:ActivatedRoute,
              private postService:PostService,
              private subredditService:SubredditService,
              private randomColor:RandomColor) { }

  posts:Post[]
  subreddit_id:number
  subreddit:Subreddit
  ngOnInit():void 
  {
    this.getPostBySubreddit()
  }

  async getPostBySubreddit()
  {
    await this.getIdSubreddit()
    this.getSubredditById(this.subreddit_id)
    this.postService.getBySubredditId(this.subreddit_id).subscribe(
      result=>
      {
        this.posts=result;
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
      }
    )
  }
  joinSubreddit()
  {
    this.subredditService.joinSubreddit(this.subreddit_id).subscribe(
      result=>
      {
        
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
