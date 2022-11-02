import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/models/blog';
import { BlogService } from 'src/app/services/blog.service';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  imagenSerUrl = environment.mediaUrl;
  blogs: Blog[]=[];
  error: {};
  p: number = 1;
  count: number = 8;

  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit() {
    window.scrollTo(0,0);
    this.blogService.getBlogs().subscribe(
      blogs => {
        this.blogs = blogs;
        console.log(this.blogs);
      }
    )
  }


}
