import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Rx";

/*
  Generated class for the Simulate provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SimulateService {
  public directionService : google.maps.DirectionsService;
  public myRoute: any;
  public myrouteIndex: any;
  constructor() {
    this.directionService = new google.maps.DirectionsService();
  }

    riderPickedUp(){
      return Observable.timer(1000);
    }

    riderDropOff(){
      return Observable.timer(1000);      
    }

   getPckUpCar(){
    return Observable.create(observable => {
      let car = this.myRoute[this.myrouteIndex];
      observable.next(car);
      this.myrouteIndex++;
    });
   }

   getCars(lat ,lng){
    let carData = this.cars[this.carIndex];
    this.carIndex++;

    if(this.carIndex > this.cars.length-1){
      this.carIndex  = 0;
    }
    return Observable.create(
      observer => observer.next(carData)
    )
  }

  calculateRoute(start,end){
    return Observable.create(observable => {
      this.directionService.route({
        origin: start,
        destination:end,
        travelMode: google.maps.TravelMode.DRIVING
      },(response, status) => {
        if(status == google.maps.DirectionsStatus.OK){
          observable.next(response);
        }else{
          observable.error(status);
        }
      });
    });
  }

  getSegmentedDirections(directions){
    let route = directions.routes[0];
    let legs = route.legs;
    let path = [];
    let increment = [];
    let duration = 0;
    let numOfLegs = legs.length;

    while(numOfLegs--){
      let leg = legs[numOfLegs];
      let steps = leg.steps;
      let noOfSteps = steps.length;

      while(noOfSteps--){
        let step = steps[noOfSteps];
        let points = step.path;
        let noOfPoints = points.length;
        duration += step.duration.value;
          while(noOfPoints--){
            let point = points[noOfPoints];
            path.push(point);
            increment.unshift({
              position: point,
              time: duration,
              path: path.slice(0)
            });
          }
      } 
    }
    return increment;
  }

  simulateRoute(start,end){
    return Observable.create(observable => {
      this.calculateRoute(start,end).subscribe(directions => {
        this.myRoute = this.getSegmentedDirections(directions);
        this.getPckUpCar().subscribe(car => {
          observable.next(car);
        });
      });
    });
  }

  dropOffPickUpCar(start,end){
    return this.simulateRoute(start,end);
    
  }

  findPickUpCar(pickup){
    this.myrouteIndex = 0;
    let car = this.cars1.cars[0];
    let start = new google.maps.LatLng(car.coords.lat, car.coords.lng);
    let end = pickup
    return this.simulateRoute(start,end);

  }

  private carIndex: number= 0;

  private cars1 = {
    cars: [{
      id:1,
      coords: {
        lat : 6.907395,
        lng: 79.979251
      }
    },{
      id:2,
      coords: {
        lat : 6.910803,
        lng: 79.981655
      }
    }

    ]
  }; 

    private cars2 = {
    cars: [{
      id:3,
      coords: {
        lat : 6.842974,
        lng: 79.948696
      }
    },{
      id:4,
      coords: {
        lat : 6.843655,
        lng: 79.957279
      }
    }

    ]
  }; 

    private cars3 = {
    cars: [{
      id:5,
      coords: {
        lat : 6.843655,
        lng: 79.969638
      }
    },{
      id:6,
      coords: {
        lat : 6.839565,
        lng: 79.975132
      }
    }

    ]
  }; 

    private cars4 = {
    cars: [{
      id:7,
      coords: {
        lat :  6.933297,
        lng: 79.965175
      }
    },{
      id:8,
      coords: {
        lat :  6.928185,
        lng: 79.968608
      }
    }

    ]
  }; 

    private cars5 = {
    cars: [{
      id:1,
      coords: {
        lat :6.873311,
        lng: 79.911960
      }
    },{
      id:2,
      coords: {
        lat : 6.882854,
        lng: 79.921917
      }
    }

    ]
  }; 

  private cars: Array<any>= [this.cars1,this.cars2,this.cars3,this.cars4,this.cars5];
}
