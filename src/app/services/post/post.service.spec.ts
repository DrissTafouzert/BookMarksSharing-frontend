import { TestBed } from '@angular/core/testing';

import { PostService } from './post.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('PostService', () => {
  let service: PostService;
  let httpMock:HttpTestingController
  let http:HttpClient

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[PostService]
    }); 
    service = TestBed.inject(PostService);
    httpMock=TestBed.get(HttpTestingController)
    http=TestBed.inject(HttpClient)
  });  

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
