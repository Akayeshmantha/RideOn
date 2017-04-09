// tslint:disable-next-line:no-unused-variable
import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
// tslint:disable-next-line:no-unused-variable
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, ViewController } from 'ionic-angular';
import * as firebase from 'firebase';

import { Camera } from 'ionic-native';

@Component({
  selector: 'imagepick',
  templateUrl: 'image.html'
})

export class ItemCreatePage {
  @ViewChild('fileInput') fileInput;
  @Output() uploadFile = new EventEmitter();

  isReadyToSave: boolean;

  item: any;

  form: FormGroup;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      profilePic: [''],
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  ionViewDidLoad() {

  }

  getPicture() {
    if (Camera['installed']()) {
      Camera.getPicture({
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' +  data });
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  processWebImage(event) {
    let input = this.fileInput.nativeElement;

    var reader = new FileReader();
    reader.onload = (readerEvent) => {
    //   input.parentNode.removeChild(input);

      var imageData = (readerEvent.target as any).result;
      debugger
      this.uploadFile.emit(imageData);
      // firebase.storage().ref().child('images').putString(imageData,'data_url')
      // .then(function(snapshot) {
      // console.log('Uploaded a data_url string!')});
      this.form.patchValue({ 'profilePic': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }


}
