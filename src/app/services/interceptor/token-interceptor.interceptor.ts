import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { AuthService } from '../authentification/auth.service';
import { LoginResponse } from 'src/app/models/loginRequest/login-response';
import { switchMap, catchError, map, tap, filter, take } from 'rxjs/operators';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor 
{
  isTokenRefreshed=false
  refreshTokenSubject:BehaviorSubject<any>=new BehaviorSubject(null)
  constructor(private authService:AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
  {
    if(request.url.match('login') || request.url.match('refresh'))
    {     
      return next.handle(request)
    }
    const jwt=this.authService.getJwtToken()
    if(jwt)
    {
      return next.handle(this.addToken(request,jwt)).pipe(
        catchError(error=>
          {
            if(error instanceof HttpErrorResponse && (error.status===403  || error.status===401))
            {
              return this.handleAuthError(request, next)
            }
            else
            {
              return throwError(error)
            }
          })
      )
    }
    return next.handle(request);
  }
  private handleAuthError(req:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>>
  {
    if(!this.isTokenRefreshed)
    {      
      this.isTokenRefreshed=true
      this.refreshTokenSubject.next(null)

      return this.authService.refreshToken().pipe(
        switchMap((refreshTokenResponse:LoginResponse)=>
        {          
          this.isTokenRefreshed=false
          this.refreshTokenSubject.next(refreshTokenResponse.authenticationToken)
          return next.handle(this.addToken(req,refreshTokenResponse.authenticationToken))
        }))
    }
    else
    {
      return this.refreshTokenSubject.pipe(
        filter(result=> result!==null),
        take(1),
        switchMap((result)=>
        {
          return next.handle(this.addToken(req,this.authService.getJwtToken()))
        })
      )
    }
      
  }
  addToken(req:HttpRequest<any>,jwtToken:any)
  {
    return req.clone({
      headers:req.headers.set('Authorization','Bearer '+jwtToken)
    })
  }
}
