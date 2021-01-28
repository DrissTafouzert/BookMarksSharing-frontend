import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { CreatePostComponent } from './components/post/create-post/create-post.component';
import { AuthGuard } from './guards/authGuard/auth.guard';
import { DetailPostComponent } from './components/post/detail-post/detail-post.component';
import { ListSubredditsComponent } from './components/subreddit/list-subreddits/list-subreddits.component';
import { CreateSubredditComponent } from './components/subreddit/create-subreddit/create-subreddit.component';
import { ViewSubredditComponent } from './components/subreddit/view-subreddit/view-subreddit.component';
import { PopularComponent } from './components/popular/popular.component';


const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'sign-up', component:SignUpComponent},
  {path:'login', component:LoginComponent},
  {path:'create-post',component:CreatePostComponent, canActivate:[AuthGuard]},
  {path:'detail-post/:id',component:DetailPostComponent},
  {path:'subreddit-post/:id',component:ViewSubredditComponent},
  {path:'create-subreddit', component:CreateSubredditComponent},
  {path:'list-subreddit',component:ListSubredditsComponent},
  {path:'popular-posts',component:PopularComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
