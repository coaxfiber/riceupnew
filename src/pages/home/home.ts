import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { PopupOnloadPage } from '../popup-onload/popup-onload';
import { ProductViewPage } from '../product-view/product-view';
import { GlobalProvider } from '../../providers/global/global';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	greenline = 2;
	map = 1
  constructor(public navCtrl: NavController,public menuCtrl: MenuController,public global:GlobalProvider) {
    if (this.global.popup == 1) {
      this.navCtrl.push(PopupOnloadPage);
      this.global.popup=2;
    }
  }

  greenlineactivate(x){
	this.greenline = x;
  }

 change(x){
   this.map = x
 }

 openproduct(x){
     this.navCtrl.push(ProductViewPage);
 }
}
