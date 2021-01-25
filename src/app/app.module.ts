import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { CreatePostComponent } from './components/post/create-post/create-post.component';
import { ViewPostComponent } from './components/post/view-post/view-post.component';
import { CreateSubredditComponent } from './components/subreddit/create-subreddit/create-subreddit.component';
import { ListSubredditsComponent } from './components/subreddit/list-subreddits/list-subreddits.component';
import { TokenInterceptorInterceptor } from './services/interceptor/token-interceptor.interceptor';
import {EditorModule} from '@tinymce/tinymce-angular' 
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { DetailPostComponent } from './components/post/detail-post/detail-post.component';
import { CommentComponent } from './components/comment/comment.component'; 
import { RandomColor } from './services/random-color';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    CreatePostComponent,
    ViewPostComponent,
    CreateSubredditComponent,
    ListSubredditsComponent,
    SideBarComponent,
    DetailPostComponent,
    CommentComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgxWebstorageModule.forRoot(),
    EditorModule,
    // HttpClientTestingModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorInterceptor,
      multi:true
    },
    RandomColor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
