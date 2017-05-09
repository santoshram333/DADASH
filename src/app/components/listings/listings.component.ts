import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFire } from 'angularfire2';
import {Router,Route,ActivatedRoute} from '@angular/router';
import {FirebaseAuthState} from 'angularfire2';
import {AngularFireAuth} from 'angularfire2/auth';
import {  FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';


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
  usagetable:any;
  public column_ChartData:any[];
  name:any;
  msgs: FirebaseListObservable<any>;
  msgVal: string = '';
 

  constructor(public af:AngularFire,private firebaseService:FirebaseService,private router:Router,private auth:AngularFireAuth) {
    this.msgs = af.database.list('/messages', {
      query: {
        limitToLast: 10
      }
    });

   this.af.auth.subscribe((auth) => {
    if (auth) {
       
          
     this.user = this.af.database.object('users/' + auth.uid);
     this.userKey = auth.uid;
    console.log(this.userKey);
        this.firebaseService.getusage(this.userKey).subscribe(usages => {
        this.usages=usages;

    console.log(this.usages); 
    
     
    var a = new Array(5);

    var b = new Array(5);

    var c = new Array(5);
    var d = new Array(5);
  for (var i = 0;i < this.usages.length;i++){

     a[i] = this.usages[i].cost;
     b[i] = this.usages[i].$key;
     c[i] = this.usages[i].usage;
     d[i] = this.usages[i].duration;
   } 
    


    this.column_ChartData = [
        ['Time', 'Cost', 'Usage','Duration'],
        [b[0] , a[0] , c[0], d[0]],
        [b[1] , a[1] , c[1], d[1]],
        [b[2] , a[2] , c[2], d[2]],
        [b[3] , a[3] , c[3], d[3]],
        [b[4] , a[4] , c[4], d[4]]
        ];  
         

  });
      this.firebaseService.getusagetable(this.userKey).subscribe(usagetable => {
      this.usagetable=usagetable;

      
  });

      }
      
  });

   }

  ngOnInit() {

}

public chatSend(theirMessage: string) {
    this.msgs.push({ message: theirMessage, name: this.name.google.displayName});
    this.msgVal = '';
  }

public column_ChartOptions = {
        title: '',
        chartArea: { width: '70%' },
        hAxis: {
            title: 'Time',
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
            title: 'Usage,Duration,Cost',
            textStyle: {
                fontSize: 12,
                bold: true,
                color: '#848484'
            },
            titleTextStyle: {
                fontSize: 12,
                bold: true,
                color: '#848484'
            }
        }
    };
    reroute(){

       this.router.navigate(['/']);
       console.log("working");
    }
}