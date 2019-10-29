import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

import { ModalController,ModalOptions } from 'ionic-angular';
import { RegisterPage } from '../register/register';

import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';

import {Config,LoadingController, Loading } from 'ionic-angular';

import { GlobalProvider } from '../../providers/global/global';
import { Storage } from '@ionic/storage';/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  password=''
  email=''
  loading: Loading;
 constructor(public global: GlobalProvider,
   public loadingCtrl: LoadingController,
   public loadingController: LoadingController,
   private alertCtrl: AlertController,
   private http: Http,
   private storage:Storage,
   private modal:ModalController,
   private view:ViewController,public navCtrl: NavController, public navParams: NavParams) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  closemodal(){
  	this.view.dismiss();
  }
    openregister(){
  	const mymodaloptions:ModalOptions = {
        enableBackdropDismiss:false
      }
      var none='none'
      const mymodal = this.modal.create(RegisterPage,{data:none},mymodaloptions)
  	this.view.dismiss();
      mymodal.present()
  }
login(){

    if (this.password==''||this.email=='') {
      this.global.presentAlert("All fields are required!","Warning")
    }else 
    if (!this.ValidateEmail(this.email)){
      this.global.presentAlert("You have entered an invalid email address!","Warning")
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
           urlSearchParams.append('email', this.email);
           urlSearchParams.append('password', this.password);
           urlSearchParams.append('pass', 'login');
        let body = urlSearchParams.toString()

     this.http.post(this.global.api,body,option)
          .map(response => response.json())
          .subscribe(res => {
            //console.log(res)
              this.loading.dismissAll();
              if (res.message == 'found') {
                this.view.dismiss();
                this.global.user = res.data
                this.storage.set('email', this.email);
                this.global.menuToggle()
              }else{
                this.global.presentAlert("Username or password are incorrect!","Warning");
              }
              //this.view.dismiss();
              //this.presentAlert("Registration Complete!");
          },error=>{
              this.loading.dismissAll();
            this.global.presentAlert("No Internet/Server Down!","Error")
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
