import { TestBed, fakeAsync, async } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock:HttpTestingController
  let http:HttpClient
  let localStorage:LocalStorageService
  let store={}
  const mockLocalStorage={
    retrieve:(key:string):string=>
    {
      return key in store ? store[key] :null
    },
    store:(key:string, value:string)=>
    {
      store[key]=value
    },
    clear:(key:string)=>
    {
      if(key==null)
        store={}
      else
        delete store[key]
    }
    
  }
  beforeEach( () => 
  {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[{provide:LocalStorageService,useValue:mockLocalStorage}]
    });
    service = TestBed.inject(AuthService);
    httpMock=TestBed.get(HttpTestingController)
    http=TestBed.inject(HttpClient)
    localStorage=TestBed.inject(LocalStorageService)
    spyOn(localStorage,"retrieve").and.callFake(mockLocalStorage.retrieve)
    spyOn(localStorage,"store").and.callFake(mockLocalStorage.store)
  });

  it('should be created',() => 
  { 
      expect(service).toBeTruthy();
  });
});
