import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,ModalOptions } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';

import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
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
  constructor(
  private http: Http,
  private modal:ModalController,
  public navCtrl: NavController,
  public navParams: NavParams,
  public global:GlobalProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BasketPage');
    this.loadpro(1)
  }
greenlineactivate(x){
	this.greenline = x
  this.loadpro(x)
}
openmodal(){
	const mymodaloptions:ModalOptions = {
		enableBackdropDismiss:false
	}
	var none='none'
	const mymodal = this.modal.create(ModalSalamatPage,{data:none},mymodaloptions)
	mymodal.present()
}
pros
loadpro(x){
  this.pros=undefined;
	var header = new Headers();
        header.append("Accept", "application/json");
        header.append("Content-Type", "application/x-www-form-urlencoded");    
        let option = new RequestOptions({ headers: header });

        let urlSearchParams = new URLSearchParams();
           urlSearchParams.append('id', this.global.user.id);
           urlSearchParams.append('status', x);
           urlSearchParams.append('pass', 'getbasket');
        let body = urlSearchParams.toString()

     this.http.post(this.global.api,body,option)
          .map(response => response.json())
          .subscribe(res => {
             this.pros=res.data
             console.log(res.data)
          },error=>{
            this.pros=[]
            this.global.presentAlert("No Internet/Server Down!","warning")
          })
}
getcalc(a,b){
  var x= parseFloat(b)
  var y= parseFloat(a)
  var n= (x*y)
  var ret= parseFloat(n.toString()).toFixed(2)
   return ret
}
gettotal(){
  var c = 0;
  var total = 0
  for (var i = 0; i < this.pros.length; ++i) {
    c=this.pros[i].price * this.pros[i].quantity
    total = total + c
  }
  return (parseFloat(total.toString()).toFixed(2)).toString()
}
checkdelivery(a){
  if (a!='') {
    return "PICKUP"
  }else
  return "DELIVERY"
}
}
