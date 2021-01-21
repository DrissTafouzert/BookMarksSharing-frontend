import { Component, OnInit } from '@angular/core';
import { SubredditService } from 'src/app/services/subreddit/subreddit.service';
import { Subreddit } from 'src/app/models/subreddit';
import { RandomColor } from 'src/app/services/random-color'; 

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit 
{
  subreddits:Subreddit[]
  constructor(private subredditService:SubredditService,
              private randomColor:RandomColor) { }

  ngOnInit(): void 
  {
      this.getAllSubreddit()
  }

  getAllSubreddit()
  {
      this.subredditService.getAll().subscribe(
      result=>
      {
        this.subreddits=result
        this.AffectAcolorToSubredditIcon(this.subreddits)
      }
    )
  }
  AffectAcolorToSubredditIcon(subreddits:Subreddit[])
  {
    subreddits.forEach(item=>
      {
        item.colorIcon=this.getRandomColor()
      })
  }
  getRandomColor()
  {
    return this.randomColor.getColor()
  }

}
