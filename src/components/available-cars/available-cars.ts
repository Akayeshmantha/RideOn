import { Component, Input, OnInit,OnChanges } from '@angular/core';
import * as SlidingMarker from 'marker-animate-unobtrusive';
import {CarService} from '../../providers/car';


/*
  Generated class for the AvailableCars component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'available-cars',
  templateUrl: 'available-cars.html',
  providers: []
})
export class AvailableCarsComponent implements OnInit {

import 
 @Input() map : google.maps.Map;
 @Input() isPickupRequested: boolean;

  text: string;
  public carMarkers: Array<google.maps.Marker>;

  constructor(public carService:CarService ) {
    this.carMarkers = [];
  }
    ngOnInit() {
    this.fetchAndRefreshCars();
   }
  ngOnChanges(){
    if(this.isPickupRequested){
      this.removeCarMarkers();
    }
  }

  removeCarMarkers(){
    let no = this.carMarkers.length;
    while(no--){
      let car = this.carMarkers.pop();
      car.setMap(null);
    }
  }

  addCarMarker(car){
    let carMarker = new SlidingMarker({
      map: this.map,
      position: new google.maps.LatLng(car.coords.lat,car.coords.lng),
      icon: '../../assets/car.png'
    });
    carMarker.setDuration(2000);
    carMarker.setEasing('linear');
    carMarker.set('id', car.id);
    this.carMarkers.push(carMarker);
  }
  updateCarMarker(car){
    if(!this.isPickupRequested){
    
    for(var i = 0 ,numOfCars =this.carMarkers.length; i < numOfCars; i++){
      // if(this.carMarkers[i].id === car.id){
        
      var vcar: any = this.carMarkers[i]
      if(vcar.id === car.id){

      this.carMarkers[i].setPosition(new google.maps.LatLng(car.coords.lat,car.coords.lng));
     
      return;
        
      }
    }
    this.addCarMarker(car);
    }
  }
  fetchAndRefreshCars(){
    if(!this.isPickupRequested){
    this.carService.getCars(9,9)
    .subscribe(cardata => {
      (<any>cardata).cars.forEach(car => {
        this.updateCarMarker(car);
      })
    });
    }
  }

}
