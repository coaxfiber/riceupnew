import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,ModalOptions } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';

import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { ModalSalamatPage } from '../modal-salamat/modal-salamat';
import {LoadingController, Loading } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
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
  loading: Loading;
  constructor(
  private http: Http,
   private alertCtrl: AlertController,
   public loadingCtrl: LoadingController,
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
temppros
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
             if (x==1) {
               this.temppros=res.data
               this.loadpropending(2)
             }else{
               this.pros=res.data
             }
          },error=>{
            this.pros=[]
            this.global.presentAlert("No Internet/Server Down!","warning")
          })
}
loadpropending(x){
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
              this.pros = this.temppros.concat(res.data);
          },error=>{
            this.global.presentAlert("No Internet/Server Down!","Error")
          })
}

updatestatus(x,y,a){

 this.alertConfirm(x,y,a)
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


alertConfirm(x,y,a) {
      let alert = this.alertCtrl.create({
        title: 'Confirm Transaction',
        message: 'are you sure you want to continue?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
            }
          },
          {
            text: 'Yes',
            handler: () => {

      this.loading = this.loadingCtrl.create({
        content: '',
      });
      this.loading.present();

  var header = new Headers();
        header.append("Accept", "application/json");
        header.append("Content-Type", "application/x-www-form-urlencoded");    
        let option = new RequestOptions({ headers: header });

        let urlSearchParams = new URLSearchParams();
           urlSearchParams.append('id', x);
           urlSearchParams.append('status', y);
           urlSearchParams.append('pass', 'payinbasket');
        let body = urlSearchParams.toString()

     this.http.post(this.global.api,body,option)
          .map(response => response.json())
          .subscribe(res => {
              this.loading.dismissAll();
              if (y==2) {
                this.loadpro(1)
              }
               const mymodaloptions:ModalOptions = {
                enableBackdropDismiss:false
              }
              var none='none'
              const mymodal = this.modal.create(ModalSalamatPage,{data:a},mymodaloptions)
              mymodal.present()

          },error=>{
              this.loading.dismissAll();
            this.global.presentAlert("No Internet/Server Down!","Error")
          })
            }
          }
        ]
      });
      alert.present();
    }
}
