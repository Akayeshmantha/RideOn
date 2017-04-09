import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import {MapDirective} from '../../components/map/map';
// import {googlemaps} from 'googlemaps'; 
import {PickupComponent } from '../../components/pickup/pickup';
import {PickupPubSub} from '../../providers/pickup-pub-sub';
import {DestinationAddressComponent} from '../../components/destination-address/destination-address';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  entryComponents: [MapDirective,PickupComponent,DestinationAddressComponent],
  providers: [PickupPubSub]

})
export class HomePage {

  public isPickRequested: boolean;
  public pickUpSubscription: any;
  public timeTillArrival:number;
  public isRiderPickedUp: boolean;
  public destination: string;
  constructor(public navCtrl: NavController, private pickupPubSub: PickupPubSub,public alertCtrl: AlertController) {
    this.isPickRequested = false;
    this.timeTillArrival= 5;
    this.isRiderPickedUp= false;
    this.pickUpSubscription= this.pickupPubSub.watch().subscribe(e => {
      this.processPickupSubscription(e);
    })
  }

  setDestination(destination){
    this.destination = destination;
  }

  processPickupSubscription(e){
    switch(e.event){
      case this.pickupPubSub.EVENTS.ARRIVAL_TIME:
        this.updateArrivalTime(e.date);
        break;
      case this.pickupPubSub.EVENTS.PICKUP: 
        this.riderPickedUp();
        break;
      case this.pickupPubSub.EVENTS.DROPOFF:
        this.riderDroppedOff();
        break;
    }
  }
  rateDrivar(){
    let prompt = this.alertCtrl.create({
      title: 'Rate Driver',
      message: 'Select rating for ure driver',
      inputs: [{
        type: 'radio',
        label: 'Perfect',
        value:'perfect',
        checked:true
      },{
        type: 'radio',
        label: 'Okay',
        value:'okay',
      },{
        type: 'radio',
        label: 'Horrible',
        value:'horrible',
      }],
      buttons: [{
        text: 'Submit',
        handler: rating => {
          console.log(rating);
        }
      }] 
    });
    prompt.present();
  }

  riderDroppedOff(){
    this.rateDrivar();
    this.isRiderPickedUp = false;
    this.isPickRequested = false;
    this.destination = null;
    this.timeTillArrival = 5;
  }
  riderPickedUp(){
    this.isRiderPickedUp = true;
  }

  updateArrivalTime(secondes){
    let minutes = Math.floor(secondes/60);
    this.timeTillArrival=minutes;
  }

  confirmPickup(){
    this.isPickRequested = true;
  }

  cancelPickup(){
    this.isPickRequested = false;
  }
}
