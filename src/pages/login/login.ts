import { Component } from '@angular/core';
import { NavController, AlertController } from "ionic-angular";
import {HelloIonicPage} from '../hello-ionic/hello-ionic';
import {RegisterPage} from '../Register/register';
import {ForgotPage} from '../forgotpassword/forgot';
import {AngularFire,AuthMethods,AuthProviders} from 'angularfire2';

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginPage {
  Email: string;
  Password: string;
  emailStatus: boolean;

  constructor(public navCtrl: NavController, public af: AngularFire,private alertCtrl: AlertController) {
    this.Email= "";
    this.Password="";
    this.emailStatus= false;
  }

  login(){
      if(this.Email != "" && this.Password != ""){
           this.af.auth.login({
               email: this.Email,
               password: this.Password
              },{
                 provider:AuthProviders.Password,
                 method: AuthMethods.Password
              }).then((response) => {
                console.log(response);
                let user = {
                  email: response.auth.email,
                  uid: response.uid
                }
                this.af.auth.subscribe((auth)=> {
                  this.emailStatus = auth.auth.emailVerified;
                });
                if(this.emailStatus){
                  this.setLocalStorage(user);
                  this.navCtrl.push(HelloIonicPage);
                  this.navCtrl.setRoot(HelloIonicPage);
                }else{
                  this.presentAlert("Login Fail", "Please verify the email to login");
                }

              }).catch((error) => {
                this.presentAlert("Login Fail","Please Enter a valid credentials" );
              })

      }else if(this.Email == ""){
        this.presentAlert("Login Fail","Please Enter a valid Email address" );
      }else{
        this.presentAlert("Login Fail","Password field is mandatory ");
      }
       this.navCtrl.push(HelloIonicPage);
      this.navCtrl.setRoot(HelloIonicPage);
  }

  register(){
      this.navCtrl.push(RegisterPage);
  }

  forgot(){
     this.navCtrl.push(ForgotPage);
  }

  loginWithGit(){
    this.af.auth.login({
      provider:AuthProviders.Github,
      method:AuthMethods.Popup
    }).then((response) => {
      let user = {
        email: response.auth.email,
        picture: response.auth.photoURL,
        uid: response.uid
      }
      this.setLocalStorage(user);
      this.navCtrl.push(HelloIonicPage);
      this.navCtrl.setRoot(HelloIonicPage);
    }).catch((error) => {
        console.log(error);
        this.presentAlert("Login Fail","Authentication Error");
    })

  }

  loginWithGoogle(){
    this.af.auth.login({
      provider:AuthProviders.Google,
      method:AuthMethods.Popup
    }).then((response) => {
      let user = {
        email: response.auth.displayName,
        picture: response.auth.photoURL,
        uid: response.uid
      }
      this.setLocalStorage(user);
      this.navCtrl.push(HelloIonicPage);
      this.navCtrl.setRoot(HelloIonicPage);
    }).catch((error) => {
        this.presentAlert("Login Fail","Authentication Error");
    })

  }

  loginWithTwitter(){
    this.af.auth.login({
      provider:AuthProviders.Twitter,
      method:AuthMethods.Popup
    }).then((response) => {
      let user = {
        email: response.auth.displayName,
        picture: response.auth.photoURL,
        uid: response.uid
      }
      this.setLocalStorage(user);
      this.navCtrl.push(HelloIonicPage);
      this.navCtrl.setRoot(HelloIonicPage);
    }).catch((error) => {
        this.presentAlert("Login Fail","Authentication Error");
    })

  }

  loginWithFacebook(){
    this.af.auth.login({
      provider:AuthProviders.Facebook,
      method:AuthMethods.Popup
    }).then((response) => {
      let user = {
        email: response.auth.displayName,
        picture: response.auth.photoURL,
        uid: response.uid
      }
      this.setLocalStorage(user);
      this.navCtrl.push(HelloIonicPage);
      this.navCtrl.setRoot(HelloIonicPage);
    }).catch((error) => {
        this.presentAlert("Login Fail","Authentication Error");
    })
  }

  setLocalStorage(user){
    localStorage.setItem('user', JSON.stringify(user));
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
