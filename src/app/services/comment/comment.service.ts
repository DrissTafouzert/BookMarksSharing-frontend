import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_REST } from 'src/app/API_REST/api_rest';
import { Comment } from 'src/app/models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http:HttpClient) { }

  save(comment:Comment)
  {
    return this.http.post(API_REST.comment.save,comment)
  }
}
