import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MenuController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,public menuCtrl: MenuController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewProfilePage');
  }
  menuToggle(){
    if(this.menuCtrl.isOpen()){
        console.log("is open");
    }
    if(this.menuCtrl.isEnabled()){
        console.log("is enabled");
    }

    this.menuCtrl.toggle();
  }
}
