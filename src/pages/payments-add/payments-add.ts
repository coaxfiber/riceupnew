import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';

/**
 * Generated class for the PaymentsAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payments-add',
  templateUrl: 'payments-add.html',
})
export class PaymentsAddPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public global:GlobalProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductAddPage');
  }

  poppage(){
      this.navCtrl.pop();
  }
}
