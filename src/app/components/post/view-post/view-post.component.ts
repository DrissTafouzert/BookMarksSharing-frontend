import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Post } from 'src/app/models/post';
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
  constructor(private voteService:VoteService) 
  { 
    this.post={
      
    }
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

}
