import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LocalStorageService } from 'ngx-webstorage';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let localStorage:LocalStorageService
  let store={}
  let mockLocalStorage={
    retrieve:(key:string):string=>
    {
      return key in store ? store[key] : null
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
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,RouterTestingModule],
      providers:[{provide:LocalStorageService,useValue:mockLocalStorage}]
    });
    guard = TestBed.inject(AuthGuard);
    localStorage=TestBed.inject(LocalStorageService)
    spyOn(localStorage,"retrieve").and.callFake(mockLocalStorage.retrieve)
    spyOn(localStorage,"store").and.callFake(mockLocalStorage.store)
    spyOn(localStorage,"clear").and.callFake(mockLocalStorage.clear)
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
