import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'src/app/models/comment';
import { RandomColor } from 'src/app/services/random-color';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit
{

  @Input() comment:Comment
  user_bg_color:string
  constructor(private randomColor:RandomColor) 
  { 
    this.comment={ 
      id_post:0,
      text:'',
      userName:'',
      createdDate:''
    }
    this.user_bg_color=this.randomColor.getColor()
  }

  ngOnInit(): void 
  {
    
  }

}
