import { Component, OnInit,Input  } from '@angular/core';
import { Loading, NavController, LoadingController } from 'ionic-angular';
// import {googlemaps} from 'googlemaps';
import { Geolocation } from 'ionic-native';
import {PickupComponent} from '../pickup/pickup';
// import { Observable } from "ionic-native/node_modules/rxjs/Observable";
import {CarService} from '../../providers/car';
import { PickupCarComponent } from '../pickup-car/pickup-car';
import { Observable } from "rxjs/Observable";

/*
  Generated class for the Map component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'map',
  templateUrl: 'map.html',
    // entryComponents: [PickupComponent]
  providers: [CarService]

})
export class MapDirective implements OnInit {

  @Input() isPickRequested: boolean;
  @Input() destination: string;

  public map;
  public isMapIdle: boolean;
  public currentLcation: google.maps.LatLng;
  constructor(public nav: NavController,public loadingCtrl: LoadingController) {
  }
  
  ngOnInit(){
   this.map = this.createMap();
   this.addMapEventListener();
    this.getCurrentLocation().subscribe(location => {
       this.centeLocation(location);
    });
  }

  updatedPickupLocation(location){
    this.currentLcation=location;
    this.centeLocation(location);
  }
  
  addMapEventListener(){
    google.maps.event.addListener(this.map, 'dragstart', () => {
      this.isMapIdle=false;
    });

     google.maps.event.addListener(this.map, 'idle', () => {
       
      this.isMapIdle=true;
    });
    // var oldCenter = null;
    // google.maps.event.addListener(this.map, "center_changed", function() { oldCenter = this.map.getCenter(); });
  }

  getCurrentLocation() {

    let loading = this.loadingCtrl.create({
      content: 'Locating..'
    });

    loading.present(); 
    let options = {timeout: 1000, enableHighAccuracy: true};

    let locationObs = Observable.create(Observable => {
      Geolocation.getCurrentPosition(options)
     .then(resp =>{
      let lat = resp.coords.latitude;
      let lng = resp.coords.longitude;

      let location = new google.maps.LatLng(lat, lng);
        Observable.next(location);
        loading.dismiss();

      }, (err) => {
      console.log("Geo location Error"+ err);
        loading.dismiss();
      });
    })
    return locationObs;
  }

  createMap(location = new google.maps.LatLng(40.712784, -74.005941)) {
    let mapOptions = {
      center: location,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    }

    let mapEl = document.getElementById('map');
    let map = new google.maps.Map(mapEl,mapOptions);

    return map;

  }
  centeLocation(location) {
    if(location){
      this.map.panTo(location);
    }
    else{
      this.getCurrentLocation().subscribe(currentLcation =>{
          this.map.panTo(currentLcation)
      });
    }
  }
}
