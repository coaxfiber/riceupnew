import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ViewProfileFarmerPage } from '../view-profile-farmer/view-profile-farmer';

import { GlobalProvider } from '../../providers/global/global';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { DomSanitizer } from '@angular/platform-browser';
/**
 * Generated class for the ProductViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-view',
  templateUrl: 'product-view.html',
})
export class ProductViewPage {
  products

  pic
  constructor(
  private domSanitizer: DomSanitizer, 
  private http: Http,public navCtrl: NavController, public navParams: NavParams,public global:GlobalProvider) {
    this.loaduserprod(navParams.data.name)
    this.pic=this.domSanitizer.bypassSecurityTrustUrl('data:image/jpeg;charset=utf-8;base64,' + navParams.data.photo)
  }
 loaduserprod(x){
   this.products=undefined;
    var header = new Headers();
        header.append("Accept", "application/json");
        header.append("Content-Type", "application/x-www-form-urlencoded");    
        let option = new RequestOptions({ headers: header });

        let urlSearchParams = new URLSearchParams();
           urlSearchParams.append('name', x);
           urlSearchParams.append('pass', 'frontproductopen');
        let body = urlSearchParams.toString()

     this.http.post(this.global.api,body,option)
          .map(response => response.json())
          .subscribe(res => {
             this.products=res.data
              //this.view.dismiss();
              //this.presentAlert("Registration Complete!");
          },error=>{
            this.products=[]
            this.global.presentAlert("No Internet/Server Down!","warning")
          })
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductViewPage');
  }

  poppage(){
      this.navCtrl.pop();
  }
  openuser(x){
      this.navCtrl.push(ViewProfileFarmerPage,x);
  }
}
