import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { PopupOnloadPage } from '../popup-onload/popup-onload';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public menuCtrl: MenuController) {
  	this.navCtrl.push(PopupOnloadPage)
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
