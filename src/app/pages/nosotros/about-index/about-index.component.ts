import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { HttpBackend, HttpClient } from '@angular/common/http';
import { About } from 'src/app/models/page';
import { PageService } from 'src/app/services/page.service';



@Component({
  selector: 'app-about-index',
  templateUrl: './about-index.component.html',
  styleUrls: ['./about-index.component.css']
})
export class AboutIndexComponent implements OnInit {

  public pages: About[]=[];

  error!: string;
  p: number = 1;
  count: number = 8;

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
