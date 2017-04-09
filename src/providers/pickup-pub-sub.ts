import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";

/*
  Generated class for the PickupPubSub provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PickupPubSub {
  public pickup$:Observable<any>;
  private _observer:Observer<any>;
  public EVENTS = {
    PICKUP: 'pickup',
    DROPOFF: 'dropoff',
    ARRIVAL_TIME: 'arrival-time'
  };

  constructor(public http: Http) {
    this.pickup$ = new Observable(observer => {
      this._observer = observer;
    })
    .share();
  }

  watch(){
    return this.pickup$;
  }

  emitArrivalTime(time){
    this._observer.next({
      event: this.EVENTS.ARRIVAL_TIME,
      date:time
    });
  }

  emitPickUp(){
    this._observer.next({
      event: this.EVENTS.PICKUP,
      date: null
    });
  }

  emitDropOff(){
    this._observer.next({
      event: this.EVENTS.DROPOFF,
      date: null
    });
  }
}
