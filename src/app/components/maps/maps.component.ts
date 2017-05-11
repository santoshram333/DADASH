import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
title: string = 'My first angular2-google-maps project';
  lat: number = 12.9256;
  lng: number =  77.6845;
  constructor() { }

  ngOnInit() {
  }

}
