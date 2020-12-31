import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from 'src/app/services/authentification/auth.service';
import { LocalStorageService } from 'ngx-webstorage';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let http:HttpClient
  let httpMock:HttpTestingController
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
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports:[HttpClientTestingModule,RouterTestingModule],
      providers:[LoginComponent,AuthService,{provide:LocalStorageService,useValue:mockLocalStorage}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    http=TestBed.inject(HttpClient)
    httpMock=TestBed.get(HttpTestingController)
    localStorage=TestBed.inject(LocalStorageService)
    spyOn(localStorage,"retrieve").and.callFake(mockLocalStorage.retrieve)
    spyOn(localStorage,"store").and.callFake(mockLocalStorage.store)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
