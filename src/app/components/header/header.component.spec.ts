import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/authentification/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LocalStorageService } from 'ngx-webstorage';
import { Local } from 'protractor/built/driverProviders';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
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
      declarations: [ HeaderComponent ],
      imports:[RouterTestingModule,HttpClientTestingModule],
      providers:[{provide:LocalStorageService,useValue:mockLocalStorage}]
     
    })
    .compileComponents();
    
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    localStorage=TestBed.inject(LocalStorageService)
   component = fixture.componentInstance;
   
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
