import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { GlobalProvider } from '../../providers/global/global';
/**
 * Generated class for the ViewProfileFarmerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-profile-farmer',
  templateUrl: 'view-profile-farmer.html',
})
export class ViewProfileFarmerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public global:GlobalProvider) {
  }

  poppage(){
      this.navCtrl.pop();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewProfileFarmerPage');
  }

}
