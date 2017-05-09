import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import { AngularFireModule,AuthProviders, AuthMethods } from 'angularfire2';
import { FlashMessagesModule } from 'angular2-flash-messages';
import {GoogleChart} from 'angular2-google-chart/directives/angular2-google-chart.directive';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ListingsComponent } from './components/listings/listings.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListingComponent } from './components/listing/listing.component';
import { AddListingComponent } from './components/add-listing/add-listing.component';
import { EditListingComponent } from './components/edit-listing/edit-listing.component';
import { FirebaseService } from './services/firebase.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { AdddeviceComponent } from './components/adddevice/adddevice.component';

export const firebaseConfig = {
  apiKey: 'AIzaSyDTBig8HtTwZhJFDs2xifl3LlplUDZcxok',
  authDomain: 'testing-fb9d6.firebaseapp.com',
  databaseURL: 'https://testing-fb9d6.firebaseio.com',
  storageBucket: 'testing-fb9d6.appspot.com',
  messagingSenderId: '291934845252'
};

const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
};

const appRoutes : Routes = [
{path:'',component: HomeComponent},
{path:'listings',component:ListingsComponent},
{path:'listing/:id',component:ListingComponent},
{path:'add-listing',component:AddListingComponent},
{path:'edit-listing/:id',component:EditListingComponent},
{path:'userprofile',component:UserprofileComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListingsComponent,
    NavbarComponent,
    ListingComponent,
    AddListingComponent,
    EditListingComponent,
    SidebarComponent,
    UserprofileComponent,
    GoogleChart,
    AdddeviceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule,
    AngularFireModule.initializeApp(firebaseConfig,firebaseAuthConfig),
    RouterModule.forRoot(appRoutes),

  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
