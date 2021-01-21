import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post/post.service';
import { Comment } from 'src/app/models/comment';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.css']
})
export class DetailPostComponent implements OnInit {

  id_post:number
  post:Post
  comments:Comment[]
  constructor(private route:ActivatedRoute,
    private postService:PostService) { }

  ngOnInit(): void 
  {
  
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

}
