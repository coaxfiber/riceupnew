import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';
import { BasketPage } from '../basket/basket';


/**
 * Generated class for the BasketAddToPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-basket-add-to',
  templateUrl: 'basket-add-to.html',
})
export class BasketAddToPage {


  constructor(private view:ViewController,
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public global:GlobalProvider) {
  }

  ionViewDidLoad() {
  	console.log(this.navParams.data)
  }

  closemodal(){
  	this.view.dismiss();
  }
  getcalculate(){
 	return ((parseFloat(this.navParams.data.data.price)*parseFloat(this.navParams.data.data.quantity)));
  }
  gotobasket(){
  	this.view.dismiss();
      this.navCtrl.push(BasketPage);

  }
}
