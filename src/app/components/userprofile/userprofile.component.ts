import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFire } from 'angularfire2';
import {FirebaseAuthState} from 'angularfire2';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router,Route,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
	user:any;
  userKey:any;
  uid:any;
  usages:any;
  name:any;
  constructor(public af:AngularFire,private firebaseService:FirebaseService,private router:Router,private auth:AngularFireAuth) {


 
   }

  ngOnInit() {
 this.af.auth.subscribe((auth) => {
    if (auth) {
       
          this.name=auth;
         this.user = this.af.database.object('/users/' + auth.uid);
          this.userKey = auth.uid;
          console.log(this.userKey);
        this.firebaseService.getuserinfo(this.userKey).subscribe(usages => {
  this.usages=usages;
  console.log(this.usages);

  


});
      }
      else{

         this.router.navigate(['']);

      }
  });
  }

}
