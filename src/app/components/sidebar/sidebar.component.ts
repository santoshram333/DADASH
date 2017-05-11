import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFire } from 'angularfire2';
import {Router,Route,ActivatedRoute} from '@angular/router';
import {FirebaseAuthState} from 'angularfire2';
import {AngularFireAuth} from 'angularfire2/auth';
import {  FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {


user:any;
userKey:any;
uid:any;
devices:any;
usage:any;
name:any;
  constructor(public af:AngularFire,private firebaseService:FirebaseService,private router:Router,private auth:AngularFireAuth) 
  {

  	this.af.auth.subscribe((auth) => {
    if (auth) {
       
          this.name=auth;
          this.user = this.af.database.object('users/' + auth.uid);
          this.userKey = auth.uid;
          //console.log(this.userKey);
        
      }
      
  });

   }

  ngOnInit() {
		 
 
}
getdevicelist()
{
	 this.firebaseService.getdevices(this.userKey).subscribe(devices => {
          this.devices=devices;
          console.log(this.devices);
     });
}

map(){

  this.router.navigate(['/maps']);
}
 }

