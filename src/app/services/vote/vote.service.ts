import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_REST } from 'src/app/API_REST/api_rest';
import { Vote } from 'src/app/models/vote';

@Injectable({
  providedIn: 'root'
})
export class VoteService 
{
  voteDto:Vote
  constructor(private http:HttpClient) 
  { 
    this.voteDto={
      post_id:null,
      voteType:''
    }
  }

  vote(post_id:number,voteType:string) :Observable<any>
  {
    this.voteDto.post_id=post_id
    this.voteDto.voteType=voteType
    return this.http.post(API_REST.vote,this.voteDto)
  }
}
