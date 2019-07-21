
import { Injectable } from '@angular/core';
import { MenuController } from 'ionic-angular';

/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalProvider {
  popup = 1;
  constructor(public menuCtrl: MenuController,) {
    console.log('Hello GlobalProvider Provider');
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
