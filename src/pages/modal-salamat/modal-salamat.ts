import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';

/**
 * Generated class for the ModalSalamatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-salamat',
  templateUrl: 'modal-salamat.html',
})
export class ModalSalamatPage {

  constructor(private view:ViewController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public global:GlobalProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalSalamatPage');
  }

  closemodal(){
  	this.view.dismiss();
  }
  getcalculate(){
   return parseFloat((parseFloat(this.navParams.data.data.price.toString())*parseFloat(this.navParams.data.data.quantity.toString())).toString()).toFixed(2);
  }
  gotobasket(){
    this.view.dismiss();
  }

}
