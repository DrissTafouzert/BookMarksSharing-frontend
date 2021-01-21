import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from 'src/app/models/post';
import { API_REST } from 'src/app/API_REST/api_rest';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Comment } from 'src/app/models/comment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  

  @Output() postsSearch:EventEmitter<Array<Post>>=new EventEmitter()
  constructor(private http:HttpClient) { }
  save(post:Post) :Observable<any>
  {
   return this.http.post<any>(API_REST.post.save,post)
  }
  getAll():Observable<Array<Post>>
  {
    return this.http.get<Array<Post>>(API_REST.post.getAll)
  }
  getById(id:number):Observable<Post>
  {
    return this.http.get<Post>(API_REST.post.getById+'/'+id)
  }
  getBySubredditId(id:number):Observable<Array<Post>>
  {
    return this.http.get<Array<Post>>(API_REST.post.getBySubredditId+'/'+id)
  }
  getByUsername(username:string):Observable<Array<Post>>
  {
    return this.http.get<Array<Post>>(API_REST.post.getByUsername+'/'+username)
  }
  searchPostByTitle(title:string):Observable<Array<Post>>
  {
    return this.http.get<Array<Post>>(API_REST.post.search+'/'+title)
      .pipe(tap(
        result=>
        {
          this.postsSearch.emit(result)
        }
      ))
  }
  getCommentsByPost(id:number):Observable<Array<Comment>>
  {
   return this.http.get<Array<Comment>>(API_REST.post.getCommentsByPostId+"/"+id)
  }

}
