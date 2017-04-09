import { Component,Output,EventEmitter } from '@angular/core';

/*
  Generated class for the DestinationAddress component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'destination-address',
  templateUrl: 'destination-address.html'
})
export class DestinationAddressComponent {

  @Output() newDest: EventEmitter<string> = new EventEmitter();
  public enteredAddress: string;
  public geoCoder: google.maps.Geocoder;
  public results: Array<any>
  constructor() {
    this.enteredAddress = "";
    this.geoCoder = new google.maps.Geocoder();
    debugger
    this.results=[];
  }

  selectDestination(destination){
    debugger
    this.results= [];
    this.enteredAddress = destination.formatted_address;
    this.newDest.next(destination.geometry.location);
  }
  onSubmit(){
    debugger
    this.results = [];
    this.geoCoder.geocode({address:this.enteredAddress}, (destination, status) => {
      if(status === google.maps.GeocoderStatus.OK){
        debugger
        this.results = destination.slice(0,4);

      }else if(status === google.maps.GeocoderStatus.ZERO_RESULTS){
        alert("No destination found");
      }
    });
  }
}
