import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';

import { ModalController,ModalOptions } from 'ionic-angular';
import { LocatePage } from '../locate/locate';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

import {Config,LoadingController, Loading } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
/**
 * Generated class for the ProductAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-add',
  templateUrl: 'product-add.html',
})
export class ProductAddPage {

 loading: Loading
  name=''
  desc=''
  address=''

  stock
  price
  unit=''
  pics=[]
  send=[]

  dp=false
  dd=false

  start=''
  end=''
  day=''

  add=false

  pickup=[]
  constructor(
   private http: Http,
   private alertCtrl: AlertController,
  private loadingCtrl: LoadingController ,
  private domSanitizer: DomSanitizer, 
  private camera: Camera,
  private transfer: FileTransfer,private modal:ModalController,public navCtrl: NavController, public navParams: NavParams,public global:GlobalProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductAddPage');
    this.global.loclat=undefined
    this.global.loclng=undefined
  }
  pushpickup(){
    this.pickup.push(this.tConvert(this.start)+" to "+this.tConvert(this.end)+" "+this.day)

  this.start=''
  this.end=''
  this.day=''
  
    this.add=false
  }
  pushpickupcancel(){
  this.start=''
  this.end=''
  this.day=''
    this.add=false
  }

  poppage(){
      this.navCtrl.pop();
  }

  locate(){
    this.navCtrl.push(LocatePage)
  }
tConvert(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? ' am' : ' pm'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
  }
  addchange(){
    if (this.add==true) {
      this.add=false
    }else
      this.add=true
  }
  upload()
  {
    
     let options: CameraOptions = {

         sourceType: this.camera.PictureSourceType.PHOTOLIBRARY ,
          destinationType: this.camera.DestinationType.DATA_URL,
          targetWidth: 375,
          targetHeight: 375,
          allowEdit:true
          };


  this.camera.getPicture(options).then((imageData) => {
   // imageData is either a base64 encoded string or a file URI
   // If it's base64 (DATA_URL):
   this.send.push(imageData)
   this.pics.push(this.domSanitizer.bypassSecurityTrustUrl('data:image/jpeg;charset=utf-8;base64,' + imageData));
  }, (err) => {
   // Handle error
  });


}


remove(s) {
      let alert = this.alertCtrl.create({
        title: 'Remove image?',
        message: '',
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
                this.pics.splice(parseInt(s), 1)
                this.send.splice(parseInt(s), 1)
            }
          }
        ]
      });
      alert.present();
    }
removepickup(s) {
      let alert = this.alertCtrl.create({
        title: 'Remove pickup time?',
        message: '',
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
                this.pickup.splice(parseInt(s), 1)
            }
          }
        ]
      });
      alert.present();
    }


  addproduct(){
    var x =''
    if (this.name=='') {
      x = x+'*Product name is required.<br>'
    }
    if (this.desc=='') {
      x = x+'*Product Description is required.<br>'
    }
    if (this.address=='') {
      x = x+'*Address is required.<br>'
    }
    if (this.global.loclat==undefined) {
      x = x+'*Product Location is required (click the locate button).<br>'
    }
    if (this.unit==undefined) {
      x = x+'*Min order is required.<br>'
    }
    if (this.price==undefined) {
      x = x+'*Price is required.<br>'
    }
    if (this.stock==undefined) {
      x = x+'*Stock is required.<br>'
    }

    if (this.dd==false&&this.dp==false) {
      x = x+'*Check at least one Delivery Option.<br>'
    }
    if (this.pics.length==0) {
      x = x+'*Upload at least 1 photo.<br>'
    }
    if (this.dp==true) {
      if (this.pickup.length==0) {
      x = x+'*Must have at least 1 pickup schedule.<br>'
      }
    }


    if (x=='') {
    var delivery_option=''
    if (this.dd==true&&this.dp==true) {
      delivery_option = '3'
    }
    if (this.dd==true&&this.dp==false) {
      delivery_option = '1'
    }
    if (this.dd==false&&this.dp==true) {
      delivery_option = '2'
    }

      this.loading = this.loadingCtrl.create({
        content: '',
      });
      this.loading.present();

        var header = new Headers();
        header.append("Accept", "application/json");
        header.append("Content-Type", "application/x-www-form-urlencoded");    
        let option = new RequestOptions({ headers: header });

        let urlSearchParams = new URLSearchParams();
           urlSearchParams.append('name', this.name);
           urlSearchParams.append('descrip', this.desc);
           urlSearchParams.append('location', this.address);
           urlSearchParams.append('min_order', this.unit);
           urlSearchParams.append('stock', this.stock);
           urlSearchParams.append('lat', this.global.loclat);
           urlSearchParams.append('lng', this.global.loclng);
           urlSearchParams.append('price', this.price);
           urlSearchParams.append('delivery_option', delivery_option);
           urlSearchParams.append('userid', this.global.user.id);
           urlSearchParams.append('pass', 'newproduct');
        let body = urlSearchParams.toString()

     this.http.post(this.global.api,body,option)
          .map(response => response.json())
          .subscribe(res => {
            console.log(res)
              if (res.message == 'found') {
                this.addpics(res.data,0)
                this.addpickup(res.data,0)
              }else{
              }
          },error=>{
              this.loading.dismissAll();
            this.global.presentAlert("No Internet/Server Down!")
          })
       }else{
         this.global.presentAlert(x,'Warning')
       }
  }

  addpickup(a,y){

    if (y<this.pickup.length) {
    var header = new Headers();
        header.append("Accept", "application/json");
        header.append("Content-Type", "application/x-www-form-urlencoded");    
        let option = new RequestOptions({ headers: header });

        let urlSearchParams = new URLSearchParams();
           urlSearchParams.append('id', a);
           urlSearchParams.append('time', this.pickup[y]);
           urlSearchParams.append('pass', 'addPickupTime');
        let body = urlSearchParams.toString()

     this.http.post(this.global.api,body,option)
          .map(response => response.json())
          .subscribe(res => {
              y++;
              console.log(res)
              if (res.message == 'found') {
                this.addpickup(a,y)
              }else{
              }
              //this.view.dismiss();
              //this.presentAlert("Registration Complete!");
          },error=>{
              this.loading.dismissAll();
            this.global.presentAlert("No Internet/Server Down!")
          })// code...
        }
  }

  addpics(x,y){
    if (y<this.pics.length) {
      
    var header = new Headers();
        header.append("Accept", "application/json");
        header.append("Content-Type", "application/x-www-form-urlencoded");    
        let option = new RequestOptions({ headers: header });

        let urlSearchParams = new URLSearchParams();
           urlSearchParams.append('product_id', x);
           urlSearchParams.append('photo', this.send[y]);
           urlSearchParams.append('pass', 'newproductpic');
        let body = urlSearchParams.toString()

     this.http.post(this.global.api,body,option)
          .map(response => response.json())
          .subscribe(res => {
              y++;
              if (res.message == 'found') {
                this.addpics(x,y)
              }else{
              }
              //this.view.dismiss();
              //this.presentAlert("Registration Complete!");
          },error=>{
              this.loading.dismissAll();
            this.global.presentAlert("No Internet/Server Down!")
          })// code...
    }else{
      this.loading.dismissAll();
      this.navCtrl.pop();
      this.global.presentAlert("Product Added!","Success");
    }
  }

}
