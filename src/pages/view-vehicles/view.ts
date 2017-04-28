import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import {VehicleDetailsPage} from '../view-vehicledetails/vehicledetails';
import * as firebase from 'firebase';
import { AngularFire , FirebaseListObservable} from 'angularfire2';
import 'rxjs/add/operator/map';
// import 'rxjs/add/operato'
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'view-vehicles',
  templateUrl: 'view.html'
})
export class ViewVehicles {
  selectedItem: any;
  icons: string[];
  filled: boolean;
  items: FirebaseListObservable<any>;
  epa: Array<any>;
  item2 : Array<{vid:string, icon:string , country:string,model:string}>;
  constructor(public navCtrl: NavController, public navParams: NavParams, af:AngularFire) {
    this.selectedItem = navParams.get('item');

    let user =JSON.parse(localStorage.getItem('user'));
    this.item2 = [];    
    this.filled = false;
    this.items = af.database.list('vehicles/'+ user.uid+ '/vehicles/');
    this.items.toPromise().then((response) => {
        console.log(response);
    }).catch((err) => {

    });

    this.items.subscribe((val) =>{
        this.epa = val;
        this.getIcons(val,user);
    } );

    
  }

  itemTapped(event, item) {
    this.navCtrl.push(VehicleDetailsPage, {
      item: item
    });
  }

  getIcons(val,user){
    let item3 : Array<{vid:string, icon:string}>;
    item3 =  [];

    val.forEach(element => {
   
       let icon = `https://firebasestorage.googleapis.com/v0/b/authentication-4b637.appspot.com/o/images%2Fvehicles%2F`+user.uid+`%2Fvehicles%2F`+element.vehicleNo+`?alt=media&token=1d34c886-27fc-4be3-b40b-edf33f77830c`;     
     
            this.item2.push({vid:element.vehicleNo , icon: icon,country:element.country, model:element.model});
       
     });
  }
}
