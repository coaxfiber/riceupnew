import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

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

  constructor(private view:ViewController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalSalamatPage');
  }

  closemodal(){
  	this.view.dismiss();
  }

}
