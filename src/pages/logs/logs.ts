import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

import { ModalController,ModalOptions } from 'ionic-angular';
import { RegisterPage } from '../register/register';

import { LoginPage } from '..//login/login';
/**
 * Generated class for the LogsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logs',
  templateUrl: 'logs.html',
})
export class LogsPage {

 constructor(private modal:ModalController,private view:ViewController,public navCtrl: NavController, public navParams: NavParams) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  closemodal(){
  	this.view.dismiss();
  }

  openlogin(){
  	const mymodaloptions:ModalOptions = {
        enableBackdropDismiss:false
      }
      var none='none'
      const mymodal = this.modal.create(LoginPage,{data:none},mymodaloptions)
  	this.view.dismiss();
      mymodal.present()
  }

}
