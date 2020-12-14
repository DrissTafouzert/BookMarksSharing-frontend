import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit 
{
  posts:Post[]
  constructor(private postService:PostService) { }

  ngOnInit(): void 
  {
    this.postService.getAll().subscribe(
      result=>
      {
        this.posts=result
      },
      error=>
      {
        console.log('Error post',error)        
      }
      
    )
    this.postService.postsSearch.subscribe(
      result=>
      {
        this.posts=result
      }
    )
  }
@HostListener('window:scroll',['$event'])
onScroll(e:Event):void
{
  console.log(
    this.getScrollingElement().scrollHeight,
    document.body.offsetHeight,
    this.getScrollingElement().scrollTop,
    this.getScrollingElement().clientHeight,
    window.innerHeight,
    window.innerHeight + window.scrollY);
    console.log( "topscroll", this.getTopPosition(e), e);
    
  
  if(window.scrollY+window.innerHeight>=this.getScrollingElement().scrollHeight)
  {
    console.log("load",e,this.getTopPosition(e));
    
  }
 

}

getTopPosition(e:Event)
{  
  return (e.target as Element).scrollTop
}
getScrollingElement()
{
  return document.scrollingElement || document.documentElement
}

}
