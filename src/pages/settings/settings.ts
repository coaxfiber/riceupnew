import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {Config,LoadingController, Loading } from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

loading:Loading
p=''
np=''
cp=''
  constructor(
   private http: Http,
   private loadingCtrl: LoadingController ,
   public global:GlobalProvider) {
  }

updatepassword(){
	if (this.p==''||this.np==''||this.cp=='') {
      this.global.presentAlert("All fields with * are required!")
    }else if (this.np!=this.cp) {
      this.global.presentAlert("New password did not match!")
    }else if (this.np==this.p) {
      this.global.presentAlert("New password and current password should not be the same!")
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
           urlSearchParams.append('email', this.global.user.email);
           urlSearchParams.append('p', this.p);
           urlSearchParams.append('np', this.np);
           urlSearchParams.append('pass', 'changepassword');
        let body = urlSearchParams.toString()

     this.http.post(this.global.api,body,option)
          .map(response => response.json())
          .subscribe(res => {
            console.log(res)
              this.loading.dismissAll();
              if (res.message == 'invalid') {
                this.global.presentAlert("Incorrect Password!");
              }else{
                this.global.presentAlert("Password Updated!");
                this.p=''
                this.np=''
                this.cp=''
              }
              //this.view.dismiss();
              //this.presentAlert("Registration Complete!");
          },error=>{
              this.loading.dismissAll();
            this.global.presentAlert("No Internet/Server Down!")
          })
       }
}
  ionViewDidLoad() {
    //console.log('ionViewDidLoad SettingsPage');
  }

}
