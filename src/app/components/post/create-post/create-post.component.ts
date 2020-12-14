import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subreddit } from 'src/app/models/subreddit';
import { Post } from 'src/app/models/post';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post/post.service';
import { SubredditService } from 'src/app/services/subreddit/subreddit.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  postForm:FormGroup
  subreddits:Array<Subreddit>
  post:Post
  constructor(private postService:PostService,
              private subredditService:SubredditService,
              private router:Router) 
  {
    this.post=
    {
      description:'',
      postName:'',
      subredditName:'',
      url:''
    }
  }

  ngOnInit() : void 
  {
    this.postForm=new FormGroup({
      description:new FormControl('',Validators.required),
      postName:new FormControl('',Validators.required),
      subredditName: new FormControl('',Validators.required),
      url:new FormControl('',Validators.required)
    })
    this.subredditService.getAll().subscribe(
      result=>
      {
        this.subreddits=result
      },
      error=>
      {
        console.log(error);        
      }
    )
  }
  discardPost()
  {
    this.router.navigate(['/'])
  }
  createPost()
  {
    this.post.description=this.postForm.get('description').value
    this.post.subredditName=this.postForm.get('subredditName').value
    this.post.url=this.postForm.get('url').value
    this.post.postName=this.postForm.get('postName').value
    this.postService.save(this.post).subscribe(
      result=>
      {
        console.log(result);
      },
      error=>
      {
        console.log(error);
      }
    )
  }
  

}
