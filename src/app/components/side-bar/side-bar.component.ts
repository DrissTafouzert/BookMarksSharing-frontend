import { Component, OnInit, Input } from '@angular/core';
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
  @Input() type:string
  @Input() subreddit_name:string
  subreddits:Subreddit[]
  subreddit:Subreddit

  constructor(private subredditService:SubredditService,
              private randomColor:RandomColor) { }

  ngOnInit(): void 
  {
      this.getAllSubreddit()
      this.getSubreddit(this.subreddit_name)
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
  getSubreddit(name:string)
  {
    this.subredditService.getSubredditByName(name).subscribe(
      result=>
      {
        this.subreddit=result
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
