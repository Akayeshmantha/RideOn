import { Component } from '@angular/core';
import { NavController, ViewController } from "ionic-angular";
import {HelloIonicPage} from '../hello-ionic/hello-ionic';
import {ItemCreatePage} from '../../components/imagePicker/image';

@Component({
  selector: 'user',
  templateUrl: 'user.html'
})


export class UserPage {
  
  private added: boolean
  constructor(public navCtrl: NavController,private viewCtrl: ViewController) {
    this.added = false;
  }
  
  
}