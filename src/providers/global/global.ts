
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
  //api="http://192.168.1.2/riceup/";
  //api="http://localhost/riceup/";
  user

  loclat
  loclng

  units
  constructor(
  private domSanitizer: DomSanitizer, 
  public menuCtrl: MenuController,private storage:Storage,private alertCtrl: AlertController) {
    console.log('Hello GlobalProvider Provider');
  }
menuToggle(){
    this.menuCtrl.toggle();
}


          presentAlert(val:any,val1="Alert") {
            let alert = this.alertCtrl.create({
              title: val1,
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
