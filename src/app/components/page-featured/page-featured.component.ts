import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { HttpBackend, HttpClient } from '@angular/common/http';
import { About } from 'src/app/models/page';
import { PageService } from 'src/app/services/page.service';


@Component({
  selector: 'app-page-featured',
  templateUrl: './page-featured.component.html',
  styleUrls: ['./page-featured.component.css']
})
export class PageFeaturedComponent implements OnInit {

  public pages: About[]=[];

  error!: string;

  public page : any = {};

  private http: HttpClient;
  ServerUrl = environment.baseUrl;
  imagenSerUrl = environment.mediaUrl;


  constructor(
    public pageService: PageService,
    private router: Router,
    handler: HttpBackend
  ) {
    this.http = new HttpClient(handler);
   }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.loadPages();
  }

  loadPages(){
    this.pageService.getPages().subscribe(
      pages => {
        this.pages = pages;
        console.log(this.pages);
      }
    )
  }

}
