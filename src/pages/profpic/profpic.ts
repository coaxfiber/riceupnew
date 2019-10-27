import {Component} from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

import { GlobalProvider } from '../../providers/global/global';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';
import {Config,LoadingController, Loading } from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
/**
 * Generated class for the ProfpicPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-profpic',
  templateUrl: 'profpic.html',
})
export class ProfpicPage {
  fileUrl: any = null;
respData: any;
base64Image
imageData='';

fname
mname
lname
suffix
address

loading : Loading
constructor(
   private http: Http,
  private loadingCtrl: LoadingController ,
  private domSanitizer: DomSanitizer, 
  private camera: Camera,
  private transfer: FileTransfer,public global:GlobalProvider) {
  if (global.user.photo=='') {
  this.base64Image = 'assets/imgs/no-profile-image.jpg';
  }else{
   this.imageData=global.user.photo
   this.base64Image = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpeg;charset=utf-8;base64,' + global.user.photo);
  }

  this.fname=global.user.fname
  this.mname=global.user.mname
  this.lname=global.user.lname
  this.suffix=global.user.suffix
  this.address=global.user.address
}
upload()
  {
    
     let options: CameraOptions = {

         sourceType: this.camera.PictureSourceType.PHOTOLIBRARY ,
          destinationType: this.camera.DestinationType.DATA_URL,
          targetWidth: 250,
          targetHeight: 250,
          allowEdit:true
          };


  this.camera.getPicture(options).then((imageData) => {
   // imageData is either a base64 encoded string or a file URI
   // If it's base64 (DATA_URL):
   this.imageData=imageData
   this.base64Image = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpeg;charset=utf-8;base64,' + imageData);
  }, (err) => {
   // Handle error
  });


}

updateinfo(){
  if (this.fname==''||this.lname==''||this.address=='') {
      this.global.presentAlert("All fields with * are required!")
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
           urlSearchParams.append('fname', this.fname);
           urlSearchParams.append('mname', this.mname);
           urlSearchParams.append('lname', this.lname);
           urlSearchParams.append('address', this.address);
           urlSearchParams.append('suffix', this.suffix);
           urlSearchParams.append('photo', this.imageData);
           urlSearchParams.append('pass', 'updateinfo');
        let body = urlSearchParams.toString()

     this.http.post(this.global.api,body,option)
          .map(response => response.json())
          .subscribe(res => {
            console.log(res)
              this.loading.dismissAll();
              if (res.message == 'found') {
                this.global.user = res.data

                this.global.presentAlert("User information updated!");
              }else{
                this.global.presentAlert("Username or password are incorrect!");
              }
              //this.view.dismiss();
              //this.presentAlert("Registration Complete!");
          },error=>{
              this.loading.dismissAll();
            this.global.presentAlert("No Internet/Server Down!")
          })
       }
}



}
