import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent implements OnInit {
reg_date:any;
car_type:any;
fname:any;
lname:any;
city:any;
country:any;
email_address:any;
postal_code:any;
address:any;
about_me:any;


  constructor(
              private firebaseService:FirebaseService,
              private router:Router
  	) { }

  ngOnInit() {
    


    
  }

  onAddSubmit(){
  this.router.navigate(['']);

  let listing = {

    

  	first_name:this.fname,
    last_name:this.lname,
  	reg_date:this.reg_date,
  	car_type:this.car_type,
    address:this.address,
    city:this.city,
    postal_code:this.postal_code,
    country:this.country,
    about_me:this.about_me,
    email_address:this.email_address


  	
    

  }

  let listing2 ={

    name:this.fname,
    reg_info:'true',
    remaining_credits:'nil',
    user_status:'nil'



  }
  this.firebaseService.addListing(listing);
  this.firebaseService.addListing2(listing2);
  
  }

}
