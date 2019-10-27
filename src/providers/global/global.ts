
import { Injectable } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalProvider {
  popup = 1;
  api="http://eltonbagne.info/api/riceup/";
  user
  constructor(
  private domSanitizer: DomSanitizer, 
  public menuCtrl: MenuController,private storage:Storage,private alertCtrl: AlertController) {
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


          presentAlert(val:any) {
            let alert = this.alertCtrl.create({
              title: 'Alert',
              subTitle: val,
              buttons: ['Dismiss']
            });
            alert.present();
          }

     checkphoto(x){
       if (x=='') {
         return 'assets/imgs/no-profile-image.jpg';
          }else{
          return this.domSanitizer.bypassSecurityTrustUrl('data:image/jpeg;charset=utf-8;base64,' + x);
          }
     }
}
