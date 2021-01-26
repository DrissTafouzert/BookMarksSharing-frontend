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


const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'sign-up', component:SignUpComponent},
  {path:'login', component:LoginComponent},
  {path:'create-post',component:CreatePostComponent, canActivate:[AuthGuard]},
  {path:'detail-post/:id',component:DetailPostComponent},
  {path:'subreddit-post/:id',component:ListSubredditsComponent},
  {path:'create-subreddit', component:CreateSubredditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
