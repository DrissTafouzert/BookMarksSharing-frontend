import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Post } from 'src/app/models/post';
import { Subreddit } from 'src/app/models/subreddit';
import { RandomColor } from 'src/app/services/random-color';
import { SubredditService } from 'src/app/services/subreddit/subreddit.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { VoteService } from 'src/app/services/vote/vote.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  @Input() post:Post
  @ViewChild('upVoteBtn') upVoteBtn:ElementRef
  @ViewChild('downVoteBtn') downVoteBtn:ElementRef
  bgColorIcon:string
  constructor(private voteService:VoteService,
              private randomColor:RandomColor,
              private subredditService:SubredditService,
              private toastService:ToastService) 
  { 
    this.post={
      
    }
    this.bgColorIcon=this.randomColor.getColor()
  }

  ngOnInit(): void 
  {
    
  }
  upVote()
  {
    this.voteService.vote(this.post.id,'UPVOTE').subscribe(
      result=>
      {
        this.downVoteBtn.nativeElement.style.color="white"
        this.upVoteBtn.nativeElement.style.color='black'
        this.post.voteCount++
      }
    )
  }
  downVote()
  {
    this.voteService.vote(this.post.id,'DOWNVOTE').subscribe(
      result=>
      {
        this.downVoteBtn.nativeElement.style.color="black"
        this.upVoteBtn.nativeElement.style.color='white'
        this.post.voteCount--
      }
    )
  }
  getSubredditAndJoin()
  {
    return this.subredditService.getSubredditByName(this.post.subredditName).subscribe(
      result=>
      {
         this.joinSubreddit(result.id)
      }
    )
  }
  joinSubreddit(id:number)
  {
    this.subredditService.joinSubreddit(id).subscribe(
      result=>
      {
        this.toastService.showSucess("You joined this subreddit.")
      },
      error=>
      {
        this.toastService.showError("You have to be connected to your account, to join this subreddit.")
      }
    )
  }

}
