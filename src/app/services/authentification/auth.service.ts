import { Injectable,  Output, EventEmitter } from '@angular/core';
import { RegisterRequest } from 'src/app/models/registerRequest/register-request';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_REST } from 'src/app/API_REST/api_rest';
import { LoginRequest } from 'src/app/models/loginRequest/login-request';
import { map, tap } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginResponse } from 'src/app/models/loginRequest/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService 
{
  @Output() loggedIn:EventEmitter<boolean>= new EventEmitter();
  @Output() username:EventEmitter<string>=new EventEmitter()

  refreshTokenRequest={
    username:this.getUsername(),
    refreshToken:this.getRefreshToken()
  }
  constructor(private http:HttpClient,
              private localStorage:LocalStorageService) { }

  signup(registerRequest:RegisterRequest): Observable<any>
  {
    return this.http.post(API_REST.auth.signup,registerRequest)
  }
  login(loginRequest:LoginRequest):Observable<any>
  {
     return this.http.post<LoginResponse>(API_REST.auth.login, loginRequest)
      .pipe(map(result => 
      {
        this.localStorage.store('authenticationToken',result.authenticationToken)
        this.localStorage.store('username',result.username)
        this.localStorage.store('expireAt',result.expireAt)
        this.localStorage.store('refreshToken',result.refreshToken)
        this.loggedIn.emit(true)
        this.username.emit(result.username)
        return true;
      }));
  }
  refreshToken():Observable<any>
  {
    return this.http.post<LoginResponse>(API_REST.auth.refreshToken,this.refreshTokenRequest)
                .pipe(tap((result:LoginResponse)=>
                  {
                    this.localStorage.clear('authenticationToken')
                    this.localStorage.clear('expireAt')
                    this.localStorage.store('authenticationToken',result.authenticationToken)
                    this.localStorage.store('expireAt',result.expireAt)
                  }))
  }
  getUsername()
  {
    return this.localStorage.retrieve('username')
  }
  getRefreshToken()
  {
    return this.localStorage.retrieve('refreshToken')
  }
  getJwtToken()
  {
    return this.localStorage.retrieve('authenticationToken')
  }
  isLoggedIn()
  {
    return this.getJwtToken() != null
  }
  logOut()
  {
    this.http.post(API_REST.auth.logOut,this.refreshTokenRequest)
              .subscribe(result=>
                {
                  console.log(result);                  
                },
                error=>
                {
                  console.log(error);                  
                })
    this.localStorage.clear('authenticationToken')
    this.localStorage.clear('username')
    this.localStorage.clear('refreshToken')
    this.localStorage.clear('expireAt')
  }
}
