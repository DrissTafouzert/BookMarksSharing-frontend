import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subreddit } from 'src/app/models/subreddit';
import { Post } from 'src/app/models/post';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post/post.service';
import { SubredditService } from 'src/app/services/subreddit/subreddit.service';
import { ToastService } from 'src/app/services/toast/toast.service';

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
              private router:Router,
              private toastService:ToastService) 
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
      url:new FormControl('')
    })
    this.subredditService.getAll().subscribe(
      result=>
      {
        this.subreddits=result
      },
      error=>
      {
        this.toastService.showError("We can't get all list of subreddit which is mandatory to create a post. Please check your connexion and refresh the page.")
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
        this.toastService.showSucess("Your post is created successfully")
        this.postForm.reset()
      },
      error=>
      {
        this.toastService.showError("There is something wrong !, check your connexion")
      }
    )
  }
  

}
