import { Component, OnInit } from '@angular/core';
import { NavController, ViewController, AlertController } from "ionic-angular";
import {HelloIonicPage} from '../hello-ionic/hello-ionic';
// import {ItemCreatePage} from '../../components/imagePicker/image';
import * as firebase from 'firebase';
import { AngularFire } from 'angularfire2';
import { LoadingController } from 'ionic-angular';


@Component({
  selector: 'user',
  templateUrl: 'user.html'
})


export class UserPage implements OnInit {
  private name:string;
  private age: string;
  private phoneNo : string;
  private email: string;
  private address: string;
  private about:string; 
  private added: boolean;
  private file;
  private items;
  private user;
  private loading;
  private icon;
  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController,private viewCtrl: ViewController,private alertCtrl: AlertController,public af: AngularFire) {
    this.added = true;
    this.loading = true;
    this.presentLoading();
    this.file="";
    this.icon = "";
    this.name, this.age,this.about,this.address,this.email,this.phoneNo = "";
  }
  
  ngOnInit() {
    let user =JSON.parse(localStorage.getItem('user'));
    this.items = this.af.database.object('user/'+ user.uid);
    this.items.toPromise().then((response) => {
        console.log(response);
    }).catch((err) => {

    });

    this.items.subscribe((val) =>{
       console.log(val.added);
       if(val.added){
         this.added = true;
         this.user = val;
         this.icon = `https://firebasestorage.googleapis.com/v0/b/authentication-4b637.appspot.com/o/images%2Fusers%2F`+user.uid+`?alt=media&token=65ad58d2-7abf-4813-903d-e26e9e4b4f01`;     

       }else{
         this.added = false;
       }
       this.loading = false;
    } );
   }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 2000
    });
    loader.present();
  }
  onSubmit(){
    debugger
     let user =JSON.parse(localStorage.getItem('user'));
       firebase.database().ref('user/'+ user.uid).set({
        name: this.name,
        age: this.age,
        phoneNo: this.phoneNo,
        email: this.email,
        about:this.about,
        address: this.address,
        added: true
       }).then((response) => {
          let user =JSON.parse(localStorage.getItem('user'));
          firebase.storage().ref().child('images/users/'+user.uid).putString(this.file,'data_url')
          .then(function(snapshot) {
          console.log('Uploaded a data_url string!')});
          this.navCtrl.push(HelloIonicPage);
          this.navCtrl.setRoot(HelloIonicPage);
          this.presentAlert("Success", "You have added details succeefully");
        }).catch((er) => {
          this.presentAlert("Error", "Error in adding details");
        });
  }

    uploadFile(file){
          this.file = file;
    };

    call(phone){
      alert(phone);
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