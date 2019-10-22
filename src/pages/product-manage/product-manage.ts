import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';

/**
 * Generated class for the ProductManagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
import { GlobalProvider } from '../../providers/global/global';
 */

@IonicPage()
@Component({
  selector: 'page-product-manage',
  templateUrl: 'product-manage.html',
})
export class ProductManagePage {
greenline = 1
  constructor(public navCtrl: NavController, public navParams: NavParams,public global:GlobalProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductManagePage');
  }
greenlineactivate(x){
	this.greenline = x
}
}
