import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { PopupOnloadPage } from '../popup-onload/popup-onload';
import { GlobalProvider } from '../../providers/global/global';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController,public menuCtrl: MenuController,public global:GlobalProvider) {
    if (this.global.popup == 1) {
      this.navCtrl.push(PopupOnloadPage);
      this.global.popup=2;
    }
  }

	
}
