import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ViewProfileFarmerPage } from '../view-profile-farmer/view-profile-farmer';

import { GlobalProvider } from '../../providers/global/global';
/**
 * Generated class for the ProductViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-view',
  templateUrl: 'product-view.html',
})
export class ProductViewPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public global:GlobalProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductViewPage');
  }

  poppage(){
      this.navCtrl.pop();
  }
  openuser(){
      this.navCtrl.push(ViewProfileFarmerPage);
  }
}
