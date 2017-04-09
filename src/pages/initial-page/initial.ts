import { Component } from '@angular/core';
import { NavController } from "ionic-angular";
import {LoginPage} from '../login/login';

@Component({
  selector: 'initial',
  templateUrl: 'initial.html'
})
export class InitialPage {
  
  constructor(public navCtrl: NavController) {
     setTimeout(() => {
        
        this.navCtrl.push(LoginPage);
        this.navCtrl.setRoot(LoginPage);
        
    }, 2000);
  }
  
  
}