import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subreddit } from 'src/app/models/subreddit';
import { SubredditService } from 'src/app/services/subreddit/subreddit.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-create-subreddit',
  templateUrl: './create-subreddit.component.html',
  styleUrls: ['./create-subreddit.component.css']
})
export class CreateSubredditComponent implements OnInit {

  subreddit:Subreddit
  subredditForm:FormGroup
  constructor(private subredditService:SubredditService,
              private toastService:ToastService) 
  { 
    this.subreddit={
      name:'',
      description:''
    }
  }

  ngOnInit(): void 
  {
    this.subredditForm=new FormGroup(
      {
        title:new FormControl('',Validators.required),
        description:new FormControl('',Validators.required)
      }
    )
  }
  saveSubreddit()
  {
    this.subreddit.name=this.subredditForm.get('title').value
    this.subreddit.description=this.subredditForm.get('description').value
    this.subredditService.save(this.subreddit).subscribe(
      result=>{
        this.toastService.showSucess("Your subreddit is created successfully")
        this.subredditForm.reset()
      },
      error=>
      {
        this.toastService.showError("Something wont wrong!!!, check your connexion and try again.")
      }
    )
  }

}
