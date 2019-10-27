import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

import { ModalController,ModalOptions } from 'ionic-angular';

import {Http, Headers, RequestOptions} from '@angular/http';
import { Storage } from '@ionic/storage';

import { GlobalProvider } from '../../providers/global/global';
import 'rxjs/add/operator/map'
import { AlertController } from 'ionic-angular';

import {Config,LoadingController, Loading } from 'ionic-angular';
import { LoginPage } from '..//login/login';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

fullname=''
email=''
password=''
cpassword=''
loading: Loading;
 constructor(public loadingCtrl: LoadingController,public loadingController: LoadingController,private alertCtrl: AlertController,public global: GlobalProvider,private http: Http,private modal:ModalController,private view:ViewController,public navCtrl: NavController, public navParams: NavParams) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  closemodal(){
  	this.view.dismiss();
  }

  register(){
    if (this.password==''||this.fullname==''||this.email=='') {
      this.global.presentAlert("All fields are required!")
    }else 
    if (!this.ValidateEmail(this.email)){
      this.global.presentAlert("You have entered an invalid email address!")
    }else 
    if (this.password!=this.cpassword){
      this.global.presentAlert("Passwords does not match!")
    }else{

      this.loading = this.loadingCtrl.create({
        content: '',
      });
      this.loading.present();

        var header = new Headers();
        header.append("Accept", "application/json");
        header.append("Content-Type", "application/x-www-form-urlencoded");    
        let option = new RequestOptions({ headers: header });

        let urlSearchParams = new URLSearchParams();
           urlSearchParams.append("full_name",this.fullname);
           urlSearchParams.append('email', this.email);
           urlSearchParams.append('password', this.password);
           urlSearchParams.append('pass', 'register');
        let body = urlSearchParams.toString()

     this.http.post(this.global.api,body,option)
          .map(response => response.json())
          .subscribe(res => {

              this.loading.dismissAll();
              this.view.dismiss();
            this.global.presentAlert("Registration Complete!");
          },error=>{
              this.loading.dismissAll();
            this.global.presentAlert("No Internet/Server Down!")
          })
       }
  }
ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    return (false)
}

    
}
