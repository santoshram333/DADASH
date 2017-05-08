import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';

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

  constructor(private af:AngularFire) {
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

    this.data = this.af.database.list('/usage/' + id, {
      query: {
        
        limitToLast: 5
      }
      
    }) as FirebaseListObservable<cd[]>
    return this.data;


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