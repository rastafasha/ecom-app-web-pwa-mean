import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Slider } from 'src/app/models/slider';
import { SliderService } from 'src/app/services/slider.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-slidertop',
  templateUrl: './slidertop.component.html',
  styleUrls: ['./slidertop.component.css']
})
export class SlidertopComponent implements OnInit {

  sliders: Slider[];
  imagenSerUrl = environment.mediaUrl;

  constructor(
    public sliderService: SliderService,
    public http: HttpClient
  ) { }

  ngOnInit(): void {
    this.obtenerSliders();
  }

  obtenerSliders(){
    return this.sliderService.getSliders().subscribe(
      resp=>{
        this.sliders = resp;
        console.log(this.sliders);
      }
    )
  }

}
