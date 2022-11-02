import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/models/blog';
import { BlogService } from 'src/app/services/blog.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-blog-featured',
  templateUrl: './blog-featured.component.html',
  styleUrls: ['./blog-featured.component.css']
})
export class BlogFeaturedComponent implements OnInit {

  blogs: Blog[]=[];
  error: {};
  imagenSerUrl = environment.mediaUrl;

  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit() {
    this.blogService.getBlogs().subscribe(
      blogs => {
        this.blogs = blogs;
        console.log(this.blogs);
      }
    )
  }

}
