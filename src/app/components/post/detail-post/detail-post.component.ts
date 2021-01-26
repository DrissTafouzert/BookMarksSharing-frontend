import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post/post.service';
import { Comment } from 'src/app/models/comment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentService } from 'src/app/services/comment/comment.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.css']
})
export class DetailPostComponent implements OnInit {

  id_post:number
  post:Post
  comments:Comment[]
  comment:Comment
  commentForm:FormGroup
  constructor(private route:ActivatedRoute,
              private postService:PostService,
              private commentService:CommentService,
              private toastService:ToastService) 
    { 
      this.comment={
        id_post:0,
        text:''
      }
    }

  ngOnInit(): void 
  {
    this.commentForm=new FormGroup(
      {
        description:new FormControl('',Validators.required)
      }
    )
    this.route.params.subscribe(
      result=>
      {
        this.id_post=result.id

        this.postService.getById(this.id_post).subscribe(
          post=>
          {
            this.post=post
          }
        )

        this.postService.getCommentsByPost(this.id_post).subscribe(
          result=>
          {
            this.comments=result
          }
        )
      }
    )
    
  }

  saveComment()
  {
    this.comment.text=this.commentForm.get('description').value
    this.comment.id_post=this.post.id
    this.commentService.save(this.comment).subscribe(
      result=>
      {
        this.toastService.showSucess("Your comment posted correctly")
      },
      error=>
      {
        this.toastService.showError("Something wont wrong !!")
      }
    )
  }

}
