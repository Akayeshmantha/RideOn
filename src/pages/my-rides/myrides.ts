import { Component } from '@angular/core';
import { NavController, ViewController } from "ionic-angular";
import {HelloIonicPage} from '../hello-ionic/hello-ionic';
import {ItemCreatePage} from '../../components/imagePicker/image';

@Component({
  selector: 'myrides',
  templateUrl: 'myrides.html'
})


export class MyRidesPage {
  
  constructor(public navCtrl: NavController,private viewCtrl: ViewController) {
 
  }
  
  
}