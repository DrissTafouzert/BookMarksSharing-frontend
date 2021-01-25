import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SubredditService } from 'src/app/services/subreddit/subreddit.service';
import { Subreddit } from 'src/app/models/subreddit';
import { RandomColor } from 'src/app/services/random-color'; 
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit 
{
  @Input() type:string
  @Input() subreddit_name:string
  @Output() click_subreddit=new EventEmitter<number>()
  subreddits:Subreddit[]
  subreddit:Subreddit

  constructor(private subredditService:SubredditService,
              private randomColor:RandomColor,
              private toastService:ToastService) { }

  ngOnInit(): void 
  {
      if(this.type=='top-subreddit')
      {
        this.getTop10Subreddit()
      }
      else
      {
        this.getSubreddit(this.subreddit_name)
      }
  }

  getTop10Subreddit()
  {
      this.subredditService.getTop10().subscribe(
      result=>
      {
        this.subreddits=result
        this.AffectAcolorToSubredditIcon(this.subreddits)
      },
      error=>
      {
        this.toastService.showError("Network error")
      }
    )
  }
  getSubreddit(name:string)
  {
    this.subredditService.getSubredditByName(name).subscribe(
      result=>
      {
        this.subreddit=result
      },
      error=>
      {
        this.toastService.showError("Network error")
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
  clickOnSubreddit(id:number)
  {
    this.click_subreddit.emit(id)
  }

}
