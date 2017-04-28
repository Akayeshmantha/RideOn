import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar, Splashscreen, Network } from 'ionic-native';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';
import {InitialPage} from '../pages/initial-page/initial';
import {RegisterVehicle} from '../pages/registerVehicle/regsterVehicl';
import {UserPage} from '../pages/user-profile/user';
import {MyRidesPage} from '../pages/my-rides/myrides';
import {HomePage} from '../pages/home/home';
import {ViewVehicles} from '../pages/view-vehicles/view';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = InitialPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController
  ) {
    this.initializeApp();
    Network.onDisconnect().subscribe(() => {
      alert("Please Hold for a moment");
    })

    // set our app's pages
    this.pages = [
      { title: 'Hello Ionic', component: HelloIonicPage },
      { title: 'My First List', component: ListPage },
      {title: 'Register Vehicle' , component:RegisterVehicle},
      {title: 'User Profile' , component: UserPage},
      {title: 'My Rides' , component: HomePage},
      {title:'View My Vehicles', component:ViewVehicles}
      
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
