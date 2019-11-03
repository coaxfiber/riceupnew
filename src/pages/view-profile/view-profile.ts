import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MenuController } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';
import { ProductAddPage } from '../product-add/product-add';
import { ManagePaymentsPage } from '../manage-payments/manage-payments';
import { ProductManagePage } from '../product-manage/product-manage';

import { ProfpicPage } from '../profpic/profpic';
import { SettingsPage } from '../settings/settings';
import { BasketPage } from '../basket/basket';
import { AlertController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
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

  constructor(
    public actionSheetController: ActionSheetController,
   private alertCtrl: AlertController,
   public navCtrl: NavController,
   public global:GlobalProvider, 
   public navParams: NavParams,
   public menuCtrl: MenuController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewProfilePage');
  }
 
  enterpage(x){
  	if (x==1) {
      this.navCtrl.push(ProductAddPage);
  	}
    if (x==2) {
      this.navCtrl.push(ProductManagePage);
    }
    if (x==3) {
      this.navCtrl.push(ManagePaymentsPage);
    }
    if (x==5) {
      this.navCtrl.push(BasketPage);
    }
  } 
   presentActionSheet() {
    const actionSheet = this.actionSheetController.create({
      title: 'Settings',
      buttons: [{
        text: 'Update User Information',
        icon: 'create',
        handler: () => {
          this.navCtrl.push(ProfpicPage);
        }
      }, {
        text: 'Change Password',
        icon: 'build',
        handler: () => {
          this.navCtrl.push(SettingsPage);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    actionSheet.present();
  }
}
