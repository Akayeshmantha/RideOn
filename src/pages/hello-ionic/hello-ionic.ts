import { Component} from '@angular/core';
import { Loader } from '../../components/loader/loader';
import { ViewController, NavController } from "ionic-angular";

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  
  constructor(public navCtrl: NavController, private viewCtrl: ViewController) {
    
  }

  
    // ionViewWillEnter() {
    //     this.viewCtrl.showBackButton(false);
    // }
}
