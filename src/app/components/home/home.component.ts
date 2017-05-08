import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router,Route,ActivatedRoute} from '@angular/router';

import {FirebaseAuthState} from 'angularfire2';
import {AngularFireAuth} from 'angularfire2/auth';

import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   user:any;
   userKey:any;
   usages:any;
  constructor(public af: AngularFire, 
              public flashMessage: FlashMessagesService,private router:Router,private firebaseService:FirebaseService) {
    /*  this.af.auth.subscribe((auth) => {
    if (auth!=null) {
       this.router.navigate(['/listings']);

         
      }
      else
      {
        
        this.router.navigate(['']);
      }
  });*/

  }
   
  ngOnInit() {


this.af.auth.subscribe((auth) => {
    if (auth) {
          

          this.user = this.af.database.object('users/' + auth.uid);
          this.userKey = auth.uid;
          console.log(this.userKey);
          this.firebaseService.getListings(this.userKey).subscribe(usages => {
          this.usages=usages;
          if(this.usages.hasOwnProperty('$value') && !this.usages['$value']){
          this.router.navigate(['/add-listing']);
   }
      else{ 

          this.router.navigate(['/listings']);
      }

  });
   
  

      }
      else{

        this.router.navigate(['']);

      }
  });


  }

    login2(){
  	this.af.auth.login();
    
     


      

}

}
