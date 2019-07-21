import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MenuController } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';

/**
 * Generated class for the ViewProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-profile',
  templateUrl: 'view-profile.html',
})
export class ViewProfilePage {

  constructor(public navCtrl: NavController,public global:GlobalProvider, public navParams: NavParams,public menuCtrl: MenuController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewProfilePage');
  }
  
}
