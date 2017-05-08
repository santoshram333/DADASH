import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFire } from 'angularfire2';
import {Router,Route,ActivatedRoute} from '@angular/router';
import {FirebaseAuthState} from 'angularfire2';
import {AngularFireAuth} from 'angularfire2/auth';
@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {
  listings:any;
  user:any;
  userKey:any;
  uid:any;
  usages:any;
  usage:any;
  public column_ChartData:any[];
 

  constructor(public af:AngularFire,private firebaseService:FirebaseService,private router:Router,private auth:AngularFireAuth) {
    this.af.auth.subscribe((auth) => {
    if (auth) {
       

         this.user = this.af.database.object('users/' + auth.uid);
          this.userKey = auth.uid;
          console.log(this.userKey);
        
      }
      else{
          this.router.navigate(['']);

      }
  });
   }

  ngOnInit() {
  this.firebaseService.getusage(this.userKey).subscribe(usages => {
          this.usages=usages;
     console.log(this.usages); 
     
    var a = new Array(3);
  for (var i = 0;i < 3;i++){

     a[i] = this.usages[i].cost;
  
    
    


    this.column_ChartData = [
        ['City', '2010 Population', '2000 Population'],
        ['New York City, NY', a[i], a[i] ],
        ['Los Angeles, CA', 3792000, 3694000],
        ['Chicago, IL', 2695000, 2896000],
        ['Houston, TX', 2099000, 1953000],
        ['Philadelphia, PA', 1526000, 1517000]];  
         
}
  });
  
  

}
public column_ChartOptions = {
        title: 'Population of Largest U.S. Cities',
        chartArea: { width: '50%' },
        hAxis: {
            title: 'Total Population',
            minValue: 0,
            textStyle: {
                bold: true,
                fontSize: 12,
                color: '#4d4d4d'
            },
            titleTextStyle: {
                bold: true,
                fontSize: 18,
                color: '#4d4d4d'
            }
        },
        vAxis: {
            title: 'City',
            textStyle: {
                fontSize: 14,
                bold: true,
                color: '#848484'
            },
            titleTextStyle: {
                fontSize: 14,
                bold: true,
                color: '#848484'
            }
        }
    };
}