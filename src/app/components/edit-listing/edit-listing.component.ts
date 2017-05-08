import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.css']
})
export class EditListingComponent implements OnInit {
	id;
	title;
	city;
	bedrooms;
	type;
	owner;
	price;
	image;
  constructor(
  		private firebaseService : FirebaseService,
  		private router : Router,
  		private route : ActivatedRoute
  	) { }

  ngOnInit() {
  	this.id=this.route.snapshot.params['id'];
  	this.firebaseService.getListingDetails(this.id).subscribe(listing => {

  		this.title = listing.title;
  		this.city = listing.city;
  		this.bedrooms = listing.bedrooms;
  		this.type = listing.type;
  		this.owner = listing.owner;
  		this.price = listing.price;

  	});
  }

  onEditSubmit(){
  	let listing = {
  		title : this.title,
  		city : this.city,
  		bedrooms : this.bedrooms,
  		type : this.type,
  		owner : this.owner,
  		price : this.price
  	}
  	this.firebaseService.updateListing(this.id,listing);
  	this.router.navigate(['/listings']);

  }

}
