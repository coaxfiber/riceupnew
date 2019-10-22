import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PopupOnloadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popup-onload',
  templateUrl: 'popup-onload.html',
})
export class PopupOnloadPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopupOnloadPage');
  }

  closeskip(){
  	this.navCtrl.pop();
  }
  saveit(){
// the url,html tag should be called from here , how ?
window.open('https://www.youtube.com');
}
}
