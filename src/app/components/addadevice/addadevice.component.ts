import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service'
import { Router, ActivatedRoute, Params} from '@angular/router';
import * as firebase from 'firebase';
import { AngularFire } from 'angularfire2';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-addadevice',
  templateUrl: './addadevice.component.html',
  styleUrls: ['./addadevice.component.css']
})
export class AddadeviceComponent implements OnInit{
reg_date:any;
device_id:any;
deviceserial:any;
device_model:any;
latitude:any;
longitude:any;
  constructor(private firebaseService:FirebaseService,
              private router:Router,public af:AngularFire,
              private auth:AngularFireAuth) { 
              this.af.auth.subscribe((auth) => {
              if (auth) {} 
              else{
  this.router.navigate(['']);
 }
 
 });
}
  ngOnInit() {

  }
 onAddSubmit(){
  this.router.navigate(['/listings']);

  let listing1 = {

    

  	
    cost: 0,
  	reg_date:this.reg_date,
  	
    device_model:this.device_model
    


  	
    

  }
  let listing2=
  {

  	device_id:this.device_id,
    reg_info:true

  }
   let listing3=
  {

    latitude:this.latitude,
    longitude:this.longitude,
   

  }
  
  this.firebaseService.adddevice(listing1,this.device_id);
  this.firebaseService.adddevice2(listing2);
  this.firebaseService.adddevice3(listing3,this.device_id);
}
}

