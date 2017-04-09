import { Component } from '@angular/core';
import { NavController, ViewController, AlertController } from "ionic-angular";
import {HelloIonicPage} from '../hello-ionic/hello-ionic';
import {ItemCreatePage} from '../../components/imagePicker/image';
import * as firebase from 'firebase';
import { AngularFire } from 'angularfire2';


@Component({
  selector: 'registervehicle',
  templateUrl: 'registervehicle.html'
})


export class RegisterVehicle {
  private color: string;
  private vehicleNo: string;
  private model: string;
  private country:string;
  private relationship:string;
  private ac:boolean;
  private done: boolean;
  private file;
  constructor(public navCtrl: NavController, private viewCtrl: ViewController,public af: AngularFire,private alertCtrl: AlertController) {
    this.color,this.country,this.model,this.relationship,this.vehicleNo = "";
    this.ac=false;
    this.done = false;
    this.file ="";
  }

  registerVehicle(){

       let user =JSON.parse(localStorage.getItem('user'));


       firebase.database().ref('vehicles/'+ user.uid+ '/vehicles/'+ this.vehicleNo).set({
        vehicleNo: this.vehicleNo,
        model: this.model,
        country: this.country,
        color: this.color,
        relationship:this.relationship,
        ac: this.ac
       }).then((response) => {
          let user =JSON.parse(localStorage.getItem('user'));
          firebase.storage().ref().child('images/vehicles/'+user.uid+'/vehicles/'+this.vehicleNo).putString(this.file,'data_url')
          .then(function(snapshot) {
          console.log('Uploaded a data_url string!')});
          this.navCtrl.push(HelloIonicPage);
          this.navCtrl.setRoot(HelloIonicPage);
          this.presentAlert("Success", "Youre vehicle registered succeefully");
        }).catch((er) => {
          this.presentAlert("Error", "Youre vehicle registered succeefully");
        });
    }

    uploadFile(file){
          this.file = file;
    };


   presentAlert(text,text2) {
    let alert = this.alertCtrl.create({
      title: text,
      subTitle: text2,
      buttons: ['Dismiss']
    });
    alert.present();
  }
}
