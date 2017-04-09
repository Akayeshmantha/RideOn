import { Component } from '@angular/core';
import { NavController, AlertController } from "ionic-angular";
import {LoginPage} from '../login/login';
import {AngularFire,AuthMethods,AuthProviders} from 'angularfire2';
import * as firebase from 'firebase';

@Component({
  selector: 'forgot',
  templateUrl: 'forgot.html'
})
export class ForgotPage {

  private Email: string;
  constructor(public navCtrl: NavController,public af: AngularFire,private alertCtrl: AlertController) {
    this.Email = "";
  }

  forgot(){
    if(this.Email != ""){
      firebase.auth().sendPasswordResetEmail(this.Email).then((res) => {
        alert('k');
      }).catch((er) => {
        alert('aaaabaaaa');
      });
    }
      this.navCtrl.push(LoginPage);
      this.navCtrl.setRoot(LoginPage);
  }

}
