import { LoadingController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'loader',
  templateUrl: 'loader.html'
})
export class Loader implements OnInit{
  constructor(public loadingCtrl: LoadingController) {
  }

  ngOnInit() { 
    this.presentLoadingDefault();
   }
  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      //  content:  `
      // <div class="custom-spinner-container">
      //   <div class="custom-spinner-box"></div>
      // </div>`,
      showBackdrop:false
    });

    loading.present();

    setTimeout(() => {
        loading.dismiss();
    }, 1000);
  }
}