import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';
import { Router, ActivatedRoute, Params} from '@angular/router';
@Injectable()
export class FirebaseService {

  listings: FirebaseListObservable<any[]>;
  listing: FirebaseObjectObservable<any>;
  usages:FirebaseObjectObservable<any>;
  usage:FirebaseObjectObservable<any[]>;
  data:FirebaseListObservable<any[]>;
  userKey:any;
  user:any;
  folder:any;
  usagesgraph:FirebaseListObservable<any[]>;
  devices: FirebaseListObservable<any[]>;
  device:FirebaseListObservable<any[]>;
 devices2:FirebaseObjectObservable<any>;
device3:FirebaseObjectObservable<any>;
  constructor(private af:AngularFire,private router : Router,) {
  	this.folder="listingimages";
    this.listings = this.af.database.list('/listings') as FirebaseListObservable<Listing[]>
    this.af.auth.subscribe((auth) => {
    if (auth) {
       

         this.user = this.af.database.object('users/' + auth.uid);
          this.userKey = auth.uid;
          
        
      }
      
  });
       }
  getListings(userKey){
    this.usages = this.af.database.object('/users/' + userKey) as FirebaseObjectObservable<usage>
    return this.usages;
    
   

  }

  getListingDetails(id){
   
   this.listing = this.af.database.object('/listings/'+id) as FirebaseObjectObservable<Listing>
   return this.listing;
  }

  addListing(listing){
  	//create root ref
  	//let storageRef = firebase.storage().ref();
  //	for(let  selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]] ){
  	//	let path = `/${this.folder}/${selectedFile.name}`;
  		//let iRef = storageRef.child(path);
  		//iRef.put(selectedFile).then((snapshot) => {
  		//	listing.image = selectedFile.name;
  		//	listing.path = path;
      this.usages = this.af.database.object('/user_info/' + this.userKey) as FirebaseObjectObservable<Listing>
      
  			return this.usages.update(listing);
  		

  	
  }
 addListing2(listing){
    //create root ref
    //let storageRef = firebase.storage().ref();
  //  for(let  selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]] ){
    //  let path = `/${this.folder}/${selectedFile.name}`;
      //let iRef = storageRef.child(path);
      //iRef.put(selectedFile).then((snapshot) => {
      //  listing.image = selectedFile.name;
      //  listing.path = path;
      this.usages = this.af.database.object('/users/' + this.userKey) as FirebaseObjectObservable<Listing>
      
        return this.usages.update(listing);
      

    
  }
  updateListing(id,listing){
    return this.listings.update(id,listing);


  }

  deleteListing(id){
    return this.listings.remove(id);

  }

  getuserinfo(id){
    this.usage = this.af.database.object('/user_info/' + id) as FirebaseObjectObservable<usage>
    return this.usage;


  }
  getusage(id){

   
    this.data = this.af.database.list('/usage', {
      query: {
        orderByChild: 'user_id',
        equalTo: id, 
        limitToLast: 5
      }
      
    }) as FirebaseListObservable<cd[]>
    return this.data;



  }

  getusagetable(id){

   
    this.data = this.af.database.list('/usage', {
      query: {
        orderByChild: 'user_id',
        equalTo: id
      }
      
    }) as FirebaseListObservable<cd[]>
    return this.data;



  }

  getdevices(id){

    this.devices = this.af.database.list('/owners/' + id) as FirebaseListObservable<cd[]>
    return this.devices;



  }
  getdevice(id){
   
    this.device = this.af.database.list('/usage', {
      query: {
        orderByChild: 'device_id',
        equalTo: id, 
        limitToLast: 5
      }
      
    }) as FirebaseListObservable<cd[]>
    

    return this.device;

  }

    getdevicetable(id){
    
    this.device = this.af.database.list('/usage', {
      query: {
        orderByChild: 'device_id',
        equalTo: id
      }
      
    }) as FirebaseListObservable<cd[]>
    

    return this.device;

  }

 getdevicedata(id){
    
     this.devices = this.af.database.list('/devices/' + id) as FirebaseListObservable<device[]>
    return this.devices;

    

  }

  getport1(e){

      this.device3 = this.af.database.object('/usage/' + e) as FirebaseObjectObservable<cd1>
    

    return this.device3;

}
getport2(e){

      this.device3 = this.af.database.object('/usage/' + e) as FirebaseObjectObservable<cd1>
    

    return this.device3;

}
getport3(e){

      this.device3 = this.af.database.object('/usage/' + e) as FirebaseObjectObservable<cd1>
    

    return this.device3;

}
}

interface Listing{
$key?:string;
name?:string;
car_type?:string;
reg_date?:string;
reg_info?:string;
remaining_credits?:string;
user_status?:string;
}

interface usage{
$key?:string;
name?:string;
car_type?:string;
reg_date?:string;
reg_info?:string;
remaining_credits?:string;
user_status?:string;
}

interface cd{
$key?:string;
$value?:string;

}
interface cd1{
$key?:string;
$value?:string;
user_id?:string;
usage?:string;
duration?:string;
device_id?:string;
cost?:string;
}
interface device{
$key?:string;
cost?:string;
master_ctrl?:any;

}

