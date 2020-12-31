import { TestBed } from '@angular/core/testing';

import { TokenInterceptorInterceptor } from './token-interceptor.interceptor';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LocalStorageService } from 'ngx-webstorage';

describe('TokenInterceptorInterceptor', () => 
{
  let interceptor: TokenInterceptorInterceptor
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
  beforeEach(() => 
  {
    TestBed.configureTestingModule({
      providers: [
        TokenInterceptorInterceptor,
        {provide:LocalStorageService,useValue:mockLocalStorage}
        ],
        imports:[HttpClientTestingModule]
    })
    interceptor=TestBed.inject(TokenInterceptorInterceptor);
    localStorage=TestBed.inject(LocalStorageService)
    spyOn(localStorage,"retrieve").and.callFake(mockLocalStorage.retrieve)
    spyOn(localStorage,"store").and.callFake(mockLocalStorage.store)
  }
  );

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
