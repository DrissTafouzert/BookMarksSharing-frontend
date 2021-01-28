import { Component, OnInit } from '@angular/core';
import { SubredditService } from 'src/app/services/subreddit/subreddit.service';
import { Subreddit } from 'src/app/models/subreddit';
import { RandomColor } from 'src/app/services/random-color';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-list-subreddits',
  templateUrl: './list-subreddits.component.html',
  styleUrls: ['./list-subreddits.component.css']
})
export class ListSubredditsComponent implements OnInit {

  constructor(private subredditService:SubredditService,
              private randomColor:RandomColor,
              private toastService:ToastService) { }

 
  subreddits:Subreddit[]
  ngOnInit():void 
  {
    this.getAllSubreddit()
  }

 getAllSubreddit()
 {
  this.subredditService.getAll().subscribe(
    result=>
    {
      this.subreddits=result
      this.subreddits.forEach(e=>
        {
          e.colorIcon=this.getRandomColor()
        })
    }
  )
 }
  
  joinSubreddit(subreddit:Subreddit)
  {
    this.subredditService.joinSubreddit(subreddit.id).subscribe(
      result=>
      {
        this.toastService.showSucess("You joined "+subreddit.name)
      },
      error=>
      {
        this.toastService.showError(error.error.message)
      }
    )
  }

  getRandomColor():string
  {
    return this.randomColor.getColor()
  }
}
