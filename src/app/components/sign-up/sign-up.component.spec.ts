import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LocalStorageService } from 'ngx-webstorage';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
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
      declarations: [ SignUpComponent ],
      imports:[RouterTestingModule,
        HttpClientTestingModule],
        providers:[{provide:LocalStorageService,useValue:mockLocalStorage}] 
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    localStorage=TestBed.inject(LocalStorageService)
    spyOn(localStorage,"retrieve").and.callFake(mockLocalStorage.retrieve)
    spyOn(localStorage,"store").and.callFake(mockLocalStorage.store)
    
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
