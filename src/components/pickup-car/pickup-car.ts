import { Component, Input, OnChanges, OnInit } from '@angular/core';
import {CarService} from '../../providers/car';
import {PickupPubSub} from '../../providers/pickup-pub-sub';
import * as SlidingMarker from 'marker-animate-unobtrusive';


/*
  Generated class for the PickupCar component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'pickup-car',
  templateUrl: 'pickup-car.html'

})
export class PickupCarComponent implements OnInit, OnChanges {
  public pickUpMarker: any;
  public polyLinePath: google.maps.Polyline;
  @Input() map : google.maps.Map;
  @Input() isPickupRequested : boolean; 
  @Input() pickupLocation: google.maps.LatLng;
  @Input() destination: string;

  constructor(public carService:CarService, public pickupPubSub:PickupPubSub) {
  
  }
    ngOnChanges() {
       if(this.destination){
         this.dropOffCar();
       }else{
        if(this.isPickupRequested){
          this.requestCar();
        }else{
          this.removeCar();
          this.removeDirections();
        }
       }
    }

    ngOnInit(){
       
    }
   dropOffCar(){
    this.carService.dropOffCar(this.pickupLocation,this.destination)
    .subscribe(car => {
      this.updateCar(() => this.checkForRiderDropOff());
    });
   }
  checkForRiderDropOff(){
    this.carService.pollForRiderDropOff().subscribe(data => {
      this.pickupPubSub.emitDropOff();
    });
  }
  removeDirections(){
    if(this.polyLinePath){
      this.polyLinePath.setMap(null);
      this.polyLinePath = null;
    }
  }

  addCarMarker(position){
    this.pickUpMarker =  new SlidingMarker({
      map: this.map,
      position: position,
      icon: '../../assets/car.png'
    });

    this.pickUpMarker.setDuration(100);
    this.pickUpMarker.setEasing('linear');

  }
  showDirection(path){
    this.polyLinePath = new google.maps.Polyline({
      path: path,
      strokeColor: '#FF0000',
      strokeWeight: 3
    });
    this.polyLinePath.setMap(this.map);

  }

  updateCar(cbDone){
    this.carService.getPickUpCar().subscribe(car => {
      this.pickUpMarker.setPosition(car.position);
      this.polyLinePath.setPath(car.path);
      this.pickupPubSub.emitArrivalTime(car.time);
      if(car.path.length > 1){
        setTimeout(()=>{
          this.updateCar(cbDone);
        },100)
      }else{
        cbDone();
      }
  });

  }
  
  checkForRiderPickup(){
    this.carService.pollForRiderPickup().subscribe(data => {
      this.pickupPubSub.emitPickUp();
    });
  }

  requestCar(){
    this.carService.findPickupCar(this.pickupLocation)
    .subscribe(car => {
      this.addCarMarker(car.postion);
      this.showDirection(car.path);
      this.updateCar(() => {
        this.checkForRiderPickup()
      });
    });
  }

  removeCar(){
    if(this.pickUpMarker){
      this.pickUpMarker.setMap(null);
      this.pickUpMarker = null;
    }
  }
}
