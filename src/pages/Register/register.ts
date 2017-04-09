import { Component } from '@angular/core';
import { NavController, AlertController } from "ionic-angular";
import {LoginPage} from '../login/login';
import {AngularFire,AuthMethods,AuthProviders} from 'angularfire2';


@Component({
  selector: 'register',
  templateUrl: 'register.html'
})


export class RegisterPage {
  private userName: string;
  private password:string;
  private email: string;
  constructor(public navCtrl: NavController, public af: AngularFire,private alertCtrl: AlertController) {
    this.email,this.password, this.userName = "";
  }

  register(){
      if(this.userName != "" && this.password != "" && this.email != "" ){
        this.af.auth.createUser({
          email:this.email,
          password: this.password
        }).then((response) => {
            this.af.auth.subscribe((auth)=> {auth.auth.sendEmailVerification()});
            this.presentAlert("Verification", "Verify the email to continue to use Ride on");
            this.navCtrl.push(LoginPage);
        }).catch((error) => {
            this.presentAlert("Sign Up Error", "Plese check the credentials before trying again");
        });
      }else if(this.userName == ""){
            this.presentAlert("Sign Up Error", "User Name is mandatory");
      }else if(this.password == ""){
            this.presentAlert("Sign Up Error", "Password is mandotoryn");
      }else if(this.email == ""){
            this.presentAlert("Sign Up Error", "Email is mandotory");
      }

  }


  presentAlert(text,text2) {
    let alert = this.alertCtrl.create({
      title: text,
      subTitle: text2,
      buttons: ['Dismiss']
    });
    alert.present();
  }
}
