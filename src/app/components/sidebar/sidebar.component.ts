import { Component, OnInit } from '@angular/core';
import {Router,Route,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
 userprofile(){
this.router.navigate(['/userprofile']);


 }
}
