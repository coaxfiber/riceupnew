import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,ModalOptions } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';

import { ModalSalamatPage } from '../modal-salamat/modal-salamat';
/**
 * Generated class for the BasketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-basket',
  templateUrl: 'basket.html',
})
export class BasketPage {
greenline=1
  constructor(private modal:ModalController,public navCtrl: NavController, public navParams: NavParams,public global:GlobalProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BasketPage');
  }
greenlineactivate(x){
	this.greenline = x
}
openmodal(){
	const mymodaloptions:ModalOptions = {
		enableBackdropDismiss:false
	}
	console.log('ess')
	var none='none'
	const mymodal = this.modal.create(ModalSalamatPage,{data:none},mymodaloptions)
	mymodal.present()
}
}
