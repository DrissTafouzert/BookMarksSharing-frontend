import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_REST } from 'src/app/API_REST/api_rest';
import { Subreddit } from 'src/app/models/subreddit';

@Injectable({
  providedIn: 'root'
})
export class SubredditService 
{
  constructor(private http:HttpClient) { }
  getAll() :Observable<any>
  {
    
   return this.http.get<any>(API_REST.subreddit.getAll)
  }
  getSubredditByName(name:string):Observable<Subreddit>
  {
    return this.http.get<Subreddit>(API_REST.subreddit.getByName+'/'+name)
  }
}
