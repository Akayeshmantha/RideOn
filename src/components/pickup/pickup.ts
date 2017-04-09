import { Component, Input, OnChanges, EventEmitter,OnInit, Output } from '@angular/core';
import { CarService } from '../../providers/car';
import { PickupPubSub } from '../../providers/pickup-pub-sub';
import { Observable } from "rxjs/Observable";

/*
  Generated class for the Pickup component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'pickup',
  templateUrl: 'pickup.html',
  providers: []
})
export class PickupComponent implements OnChanges,OnInit {
    private pickupMarker : google.maps.Marker;
    private popup : google.maps.InfoWindow;
    private pickupSubscription: any;
 @Input() isPinSet : boolean;
 @Input() map : google.maps.Map;
 @Input() isPickupRequested: boolean;
 @Input() center;
 @Input() destination: string;
 @Output() updatedPickupLocation: EventEmitter<google.maps.LatLng> = new EventEmitter();
 
  text: string;

  ngOnInit(){
    this.pickupSubscription = this.pickupPubSub.watch().subscribe(e => {
      if(e.event === this.pickupPubSub.EVENTS.ARRIVAL_TIME){
        this.updateTime(e.date);
      }
    })
  }

  ngOnChanges(changes){
    if(!this.isPickupRequested){
    if(this.isPinSet){
      this.showPickMarker();
    }else{
      this.removePickupMarker();
    }
  }
  
  if(this.destination){
    this.removePickupMarker();
  }
  }

  constructor(private pickupPubSub:PickupPubSub) {
    console.log('Hello Pickup Component');
    this.text = 'Hello World';
  }

  showPickMarker(){
    this.removePickupMarker();
    if(this.map != undefined){
    this.pickupMarker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.BOUNCE,
      // position:127,
      position: this.map.getCenter(),
      icon: '../../assets/splash.png'
    });

    setTimeout(() => {
      this.pickupMarker.setAnimation(null);
    },750);
    this.showPickTime();
    this.updatedPickupLocation.next(this.pickupMarker.getPosition());
    }
  }
  removePickupMarker(){
    if(this.pickupMarker){
      this.pickupMarker.setMap(null);
    }
  }

  showPickTime(){
    this.popup = new google.maps.InfoWindow({
      content:'<h5> You are here </h5>'
    });
      this.popup.open(this.map,this.pickupMarker);
      google.maps.event.addListener(this.pickupMarker,'click',() => {
      this.popup.open(this.map,this.pickupMarker);
        
      });

  }

  updateTime(seconds){
    let minitues = Math.floor(seconds/60);
    this.popup.setContent(`<h5>${minitues} minutes</h5>`);
  }
}
