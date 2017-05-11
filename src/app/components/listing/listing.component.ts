import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
   id:any;
   listing:any;
   imageUrl:any;
   device:any;
   devicetable:any;
   public area_ChartData:any[];
   devicedata:any;
   public gauge_ChartData:any[];
   public gauge_ChartData2:any[];
   public gauge_ChartData3:any[];
   e:any[];
   port1:any;
   port2:any;
   port3:any;
  public datasum1:any[];
  public datasum2:any[];
  public datasum3:any[];
  cost:any[];
  value:any[];
  constructor(private firebaseService: FirebaseService,
              private router : Router,
              private route : ActivatedRoute
  	) {

      // get id
      this.id=this.route.snapshot.params['id'];
      this.firebaseService.getdevice(this.id).subscribe(device => {
      this.device= device;
      console.log(this.device);
      //todo storage ref
      var a = new Array(5);
      a[0] = 0;

    var b = new Array(5);
    b[0] = 0;
    var c = new Array(5);
    c[0] = 0;
    var d = new Array(5);
    d[0]=0;
  for (var i = 1;i < this.device.length + 1;i++){

     a[i] = this.device[i-1].cost + a[i-1];
     b[i-1] = new Date(this.device[i-1].$key*1000).toString();
     c[i-1] = this.device[i-1].usage;
     d[i-1] = this.device[i-1].duration;
   } 
    


    this.area_ChartData = [
        ['Time', 'Revenue'],
        [b[1] , a[1] ],
        [b[2] , a[2] ],
        [b[3] , a[3] ],
        [b[4] , a[4] ],
        [b[5] , a[5] ]
        ];  
    
    });
  this.firebaseService.getdevicetable(this.id).subscribe(devicetable => {
  this.devicetable= devicetable;
  this.value=this.devicedata[0].$value;
  console.log(this.value);
   var f = new Array(this.devicetable.length);
      f[0] = 0;
       var g = new Array(this.devicetable.length);
      g[0] = 0;
      var h = new Array(this.devicetable.length);
      h[0] = 0;   
   for (var i = 1;i < this.devicetable.length + 1;i++){
     f[i] = this.devicetable[i-1].cost + f[i-1];
      g[i] = this.device[i-1].usage + g[i-1];
       h[i] = this.device[i-1].duration + h[i-1];
   } 
   this.datasum1=f[this.devicetable.length];
   this.datasum2=g[this.devicetable.length];
   this.datasum3=h[this.devicetable.length];
   
});


this.firebaseService.getdevicedata(this.id).subscribe(devicedata => {
this.devicedata= devicedata;
  
this.e = [this.devicedata[1].usage_id,this.devicedata[2].usage_id,this.devicedata[3].usage_id];
  console.log(this.devicedata);
  this.firebaseService.getport1(this.e[0]).subscribe(port1 => {
  this.port1= port1;
  console.log(this.port1);
  var a= this.port1.usage;
  this.gauge_ChartData = [
        ['Label', 'Value'],
        [this.devicedata[1].status, a],
        ];
 //console.l
});
   this.firebaseService.getport2(this.e[1]).subscribe(port2 => {
  this.port2= port2;
   console.log(this.port2);
   var b= this.port2.usage;
    this.gauge_ChartData2 = [
        ['Label', 'Value'],
        [this.devicedata[2].status, b],
        ];
});

this.firebaseService.getport3(this.e[2]).subscribe(port3 => {
this.port3= port3;
var c= this.port3.usage;
this.gauge_ChartData3 = [
        ['Label', 'Value'],
        [this.devicedata[3].status, c],
        ];
 console.log(this.port3);
});
});

 /*this.firebaseService.getport1(this.e[0]).subscribe(port1 => {
  this.port1= port1;
  console.log(this.port1);
});

 this.firebaseService.getport2(this.e[1]).subscribe(port2 => {
  this.port2= port2;
});

this.firebaseService.getport3(this.e[2]).subscribe(port3 => {
  this.port3= port3;
});

*/
//this.firebaseService.getcost(this.id).subscribe(devicedata => {
//this.devicedata= devicedata;



//});
   

     }

  ngOnInit() {
  	

  }

   onAddSubmit(){

    this.firebaseService.getcost(this.cost,this.id);
       this.firebaseService.getcost2(this.cost,this.id);
       this.router.navigate(['/listing/'+ this.id ]);





   }

public area_ChartOptions = {
        title: '',
        chartArea: { width: '65%' },
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
                fontSize: 12,
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
public gauge_ChartOptions = {
        width: 450, height: 240,
        redFrom: 15, redTo: 20,
        yellowFrom: 10 , yellowTo: 15,
        minorTicks: 5,
        max: 20
    };
  onDeleteClick(){
this.firebaseService.deleteListing(this.id);
this.router.navigate(['/listings']);

  }

}
