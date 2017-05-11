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
  public column_ChartData1:any[];
  public column_ChartData2:any[];
  public column_ChartData3:any[];
  name:any;
  msgs: FirebaseListObservable<any>;
  msgVal: string = '';
  public datasum1:any[];
  public datasum2:any[];
  public datasum3:any[];
  public time:any=[];
  constructor(public af:AngularFire,private firebaseService:FirebaseService,private router:Router,private auth:AngularFireAuth) {
    this.msgs = af.database.list('/messages', {
      query: {
        limitToLast: 10
      }
    });
 this.af.auth.subscribe((auth) => {
    if (auth) {
       
          
    this.name=auth;
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
     b[i] = new Date(this.usages[i].$key*1000).toString();
     c[i] = this.usages[i].usage;
     d[i] = this.usages[i].duration;
   } 
    



    this.column_ChartData1 = [
        ['Time', 'Usage',{ role: 'style' }],
        [b[0] , c[0],'green'],
        [b[1] , c[1],'green'],
        [b[2] , c[2],'green'],
        [b[3] , c[3],'green'],
        [b[4] ,  c[4],'green']
        ]; 

     this.column_ChartData2 = [
        ['Time', 'duration'],
        [b[0] , d[0]],
        [b[1] , d[1]],
        [b[2] , d[2]],
        [b[3] , d[3]],
        [b[4] ,  d[4]]
        ];  

      this.column_ChartData3 = [
        ['Time', 'cost',{ role: 'style' }],
        [b[0] , a[0],'#2e775d'],
        [b[1] , a[1],'#2e775d'],
        [b[2] , a[2],'#2e775d'],
        [b[3] , a[3],'#2e775d'],
        [b[4] ,  a[4],'#2e775d']
        ];      
         

  });
      this.firebaseService.getusagetable(this.userKey).subscribe(usagetable => {
      this.usagetable=usagetable;
      var f = new Array(this.usagetable.length);
      f[0] = 0;
       var g = new Array(this.usagetable.length);
      g[0] = 0;
      var h = new Array(this.usagetable.length);
      h[0] = 0;   
      var k = new Array(this.usagetable.length);

   for (var i = 1;i < this.usagetable.length + 1;i++){
     f[i] = this.usagetable[i-1].cost + f[i-1];
      g[i] = this.usagetable[i-1].usage + g[i-1];
       h[i] = this.usagetable[i-1].duration + h[i-1];
       this.time[i] = new Date(this.usagetable[i-1].$key*1000).toString();
   } 
   this.datasum1=f[this.usagetable.length];
   console.log(this.time[1]);
   this.datasum2=g[this.usagetable.length];
   this.datasum3=h[this.usagetable.length];


      
  });

      }
      else{this.router.navigate(['']);}
      
  });

   }

  ngOnInit() {

}

public chatSend(theirMessage: string) {
    this.msgs.push({ message: theirMessage, name: this.name.google.displayName});
    this.msgVal = '';
  }

public column_ChartOptions1 = {
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
            title: 'Usage',
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
        },
        
        colors:['green']
    };

public column_ChartOptions2 = {
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
            title: 'Duration',
            textStyle: {
                fontSize: 12,
                bold: true,
                color: 'green'
            },
            titleTextStyle: {
                fontSize: 12,
                bold: true,
                color: 'green'
            }
        }
    };

public column_ChartOptions3 = {
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
            title: 'Cost',
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
    
}