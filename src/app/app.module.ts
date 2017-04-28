import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import {Loader} from '../components/loader/loader';
import {InitialPage} from '../pages/initial-page/initial'
import {LoginPage} from '../pages/login/login';
import {RegisterPage} from '../pages/Register/register';
import {ForgotPage} from '../pages/forgotpassword/forgot';
import {RegisterVehicle} from '../pages/registerVehicle/regsterVehicl';
import {ItemCreatePage} from '../components/imagePicker/image';
import {UserPage} from '../pages/user-profile/user';
import {MyRidesPage} from '../pages/my-rides/myrides';
import { HomePage } from '../pages/home/home';
import {PickupComponent} from '../components/pickup/pickup';
import {MapDirective} from '../components/map/map';
import {AvailableCarsComponent} from '../components/available-cars/available-cars';
import {PickupCarComponent} from '../components/pickup-car/pickup-car';
import {ViewVehicles} from '../pages/view-vehicles/view';
import {VehicleDetailsPage} from '../pages/view-vehicledetails/vehicledetails';
import {AngularFireModule} from 'angularfire2';
import {DestinationAddressComponent} from '../components/destination-address/destination-address';
const firebaseConfig = {
  apiKey: 'AIzaSyDA-ls4lOKcdks1v1wMSZABzEDsTx5AZkQ',
  authDomain: 'authentication-4b637.firebaseapp.com',
  databaseURL: 'https://authentication-4b637.firebaseio.com',
  storageBucket: 'authentication-4b637.appspot.com',
  messagingSenderId: '112566065962'
};
@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    VehicleDetailsPage,
    ListPage,
    Loader,
    InitialPage,
    ViewVehicles,
    LoginPage,
    RegisterPage,
    ForgotPage,
    RegisterVehicle,
    ItemCreatePage,
    UserPage,
    MyRidesPage,
    HomePage,
    PickupComponent,
    PickupCarComponent,
    MapDirective,
    AvailableCarsComponent,
    DestinationAddressComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    ViewVehicles,
    Loader,
    VehicleDetailsPage,
    InitialPage,
    LoginPage,
    RegisterPage,
    ForgotPage,
    RegisterVehicle,
    ItemCreatePage,
    UserPage,
    MyRidesPage,
     HomePage,
    PickupComponent,
    PickupCarComponent,
    MapDirective,
    AvailableCarsComponent,
    DestinationAddressComponent
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
