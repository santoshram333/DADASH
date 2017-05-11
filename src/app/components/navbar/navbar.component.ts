import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFire } from 'angularfire2';
import {FirebaseAuthState} from 'angularfire2';
import {AngularFireAuth} from 'angularfire2/auth';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router,Route,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

name:any;

  constructor(public af : AngularFire,
              public flashMessage : FlashMessagesService,private router:Router,private auth:AngularFireAuth
  	) { 

 this.af.auth.subscribe((auth) => {
  if(auth){
this.name=auth;
}
else
{

this.router.navigate([" / "]);

}

});

    }

  ngOnInit() {


  }

  login(){
  	this.af.auth.login();
  }

  logout(){
  	this.af.auth.logout();
  	this.flashMessage.show('logged out',{cssClass: 'alert-success',timeout:3000});
   this.router.navigate(["/"]);
  }

}
