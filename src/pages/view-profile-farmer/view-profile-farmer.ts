import { Component,ViewChild,ViewEncapsulation, ElementRef   } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { GlobalProvider } from '../../providers/global/global';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { DomSanitizer } from '@angular/platform-browser';
import { Select } from 'ionic-angular';
import { LogsPage } from '../logs/logs';
import { BasketAddToPage } from '../basket-add-to/basket-add-to';
import { ModalController,ModalOptions } from 'ionic-angular';
import {Config,LoadingController, Loading } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
declare var google;
/**
 * Generated class for the ViewProfileFarmerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-profile-farmer',
  templateUrl: 'view-profile-farmer.html',
    encapsulation: ViewEncapsulation.None
})
export class ViewProfileFarmerPage {
  quantity = 1;
  @ViewChild('mySelect') mySelect: Select;
  @ViewChild('mySelect2') mySelect2: Select;
  doption=''
@ViewChild('map3') mapElement: ElementRef;
 map3;
 photo

 loading: Loading
  constructor(
    private geolocation: Geolocation,
  private loadingCtrl: LoadingController ,
  private domSanitizer: DomSanitizer, 
   private modal:ModalController,
  private http: Http,public navCtrl: NavController, public navParams: NavParams,public global:GlobalProvider) {
    console.log(this.navParams.data)
  this.getprobyuser()
  }

  getlocation(){
        this.geolocation.getCurrentPosition({timeout: 10000,enableHighAccuracy: true}).then((resp) => {
            var position = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
            var infoWindowContent = 'You are here!';
            var infoWindow = new google.maps.InfoWindow({
              content: infoWindowContent,
              position: position,
            });
            infoWindow.setMap(this.map3)
        }).catch((error) => {
          this.global.presentAlert("Failed to locate position. Turn on location or allow app to access location.","Warning!")
          
        });
  }

  slides
  pickup=[]
  pickuptime=''
  fpro
  poppage(){
      this.navCtrl.pop();
  }
  otherpro
  openpro=[]
  getprobyuser(){
    var header = new Headers();
        header.append("Accept", "application/json");
        header.append("Content-Type", "application/x-www-form-urlencoded");    
        let option = new RequestOptions({ headers: header });

        let urlSearchParams = new URLSearchParams();
           urlSearchParams.append('pass', 'getprobyid');
        let body = urlSearchParams.toString()
    this.otherpro==undefined
     this.http.post(this.global.api,body,option)
          .map(response => response.json())
          .subscribe(res => {
            this.otherpro=[];
            for (var i = 0; i < res.data.length; ++i) {
              if (res.data[i].product.length==0) {
                // code...
              }else{
                for (var i2 = 0; i2 < res.data[i].product.length; ++i2) {
                  if(res.data[i].product[i2].name==this.navParams.data.name){
                    this.photo = res.data[i].photo
                    this.fpro = res.data[i].name
                  }else{
                    if(res.data[i].product[i2].user.id == this.navParams.data.user.id){
                      this.otherpro.push(res.data[i])
                      this.openpro.push(res.data[i].product[i2])
                    }
                  }
                  
                }
              }
            }
          },error=>{
            this.global.presentAlert("No Internet/Server Down!","warning")
          })

  }

 openmap(){
   setTimeout(() => {
       
      let latLng = new google.maps.LatLng(parseFloat(this.navParams.data.lat), parseFloat(this.navParams.data.lng));
      console.log(parseFloat(this.navParams.data.lat))
      let mapOptions = {
        center: latLng,
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map3 = new google.maps.Map(this.mapElement.nativeElement, mapOptions);  
      this.getlocation()  
      this.addMarker()
     },150);
    }
  openself(x){
      this.navCtrl.pop();
      this.navCtrl.push(ViewProfileFarmerPage,this.openpro[x]);
  }
  addMarker(){

var infowindow = new google.maps.InfoWindow();

var marker

    marker = new google.maps.Marker({
      position: new google.maps.LatLng( parseFloat(this.navParams.data.lat),  parseFloat(this.navParams.data.lng)),
      map: this.map3,
      animation: google.maps.Animation.DROP
    });

  }
  openselect(){
    this.mySelect.open();
  }
  openselect2(){
    this.mySelect2.open();
  }
  ionViewDidLoad() {
    this.getpickuptime()
    var header = new Headers();
        header.append("Accept", "application/json");
        header.append("Content-Type", "application/x-www-form-urlencoded");    
        let option = new RequestOptions({ headers: header });

        let urlSearchParams = new URLSearchParams();
           urlSearchParams.append('id', this.navParams.data.id);
           urlSearchParams.append('pass', 'getpicproduct');
        let body = urlSearchParams.toString()

     this.http.post(this.global.api,body,option)
          .map(response => response.json())
          .subscribe(res => {
            //console.log(res.data)
             this.slides=res.data
              //this.view.dismiss();
              //this.presentAlert("Registration Complete!");
          },error=>{
            this.global.presentAlert("No Internet/Server Down!","warning")
          })



  }

getpickuptime(){
  var header = new Headers();
        header.append("Accept", "application/json");
        header.append("Content-Type", "application/x-www-form-urlencoded");    
        let option = new RequestOptions({ headers: header });

        let urlSearchParams = new URLSearchParams();
           urlSearchParams.append('id', this.navParams.data.id);
           urlSearchParams.append('pass', 'getPickupTime');
        let body = urlSearchParams.toString()

     this.http.post(this.global.api,body,option)
          .map(response => response.json())
          .subscribe(res => {
             this.pickup=res.data
              //this.view.dismiss();
              //this.presentAlert("Registration Complete!");
          },error=>{
            this.global.presentAlert("No Internet/Server Down!","warning")
          })
}
map=1
 changemap(x){
   this.map = x
   if (this.map == 0) {
     this.openmap()
   }
 }
  addtobasket(){
    var x =''
    if (this.quantity<1) {
      x = x+'*Quantity must not be less than 0.<br>'
    }if (this.quantity>this.navParams.data.stock) {
      x = x+'*Quantity must not be greater than QTY AVAILABLE.<br>'
    }if (this.doption=='') {
      x = x+'*Please select a delivery option.<br>'
    }else{
      if (this.doption=='pickup') {
        if (this.pickuptime=='') {
          x = x+'*Please choose a pickup time.<br>'
        }
      }
    }

    if (x!='') {
         this.global.presentAlert(x,"warning")
    }else{
      if (this.global.user!=undefined) {
        if (this.doption!='pickup') {
          this.pickuptime=''
        }

              this.loading = this.loadingCtrl.create({
                content: '',
              });
              this.loading.present();
              var asd = this.pickuptime.replace("to", "to<br>");
               var header = new Headers();
                header.append("Accept", "application/json");
                header.append("Content-Type", "application/x-www-form-urlencoded");    
                let option = new RequestOptions({ headers: header });
                let urlSearchParams = new URLSearchParams();
                   urlSearchParams.append('product_id', this.navParams.data.id.toString());
                   urlSearchParams.append('name',  this.navParams.data.name);
                   urlSearchParams.append('descrip',  this.navParams.data.descrip);
                   urlSearchParams.append('location', this.navParams.data.location);
                   urlSearchParams.append('min_order', this.navParams.data.min_order);
                   urlSearchParams.append('stock', this.navParams.data.stock.toString());
                   urlSearchParams.append('lat', this.navParams.data.lat.toString());
                   urlSearchParams.append('lng', this.navParams.data.lng.toString());
                   urlSearchParams.append('price', this.navParams.data.price);
                   urlSearchParams.append('delivery_option', this.navParams.data.delivery_option);
                   urlSearchParams.append('userid', this.navParams.data.user.id.toString());
                   urlSearchParams.append('transac_userid', this.global.user.id.toString());
                   urlSearchParams.append('quantity', this.quantity.toString());
                   urlSearchParams.append('photo', this.photo);
                   urlSearchParams.append('time', asd);
                   urlSearchParams.append('status', '1');
                   urlSearchParams.append('proname', this.fpro);
                   urlSearchParams.append('username', this.navParams.data.user.fname);
                   urlSearchParams.append('pass', 'addtobasket');
                let body = urlSearchParams.toString()

             this.http.post(this.global.api,body,option)
                  .map(response => response.text())
                  .subscribe(res => {
                      this.loading.dismissAll();
                      const mymodaloptions:ModalOptions = {
                          enableBackdropDismiss:false
                        }
                        var ddats={
                           'product_id':  this.navParams.data.id,
                           'name':  this.navParams.data.name,
                           'descrip':  this.navParams.data.descrip,
                           'location': this.navParams.data.location,
                           'min_order': this.navParams.data.min_order,
                           'stock': this.navParams.data.stock,
                           'lat': this.navParams.data.lat,
                           'lng': this.navParams.data.lng,
                           'price': this.navParams.data.price,
                           'delivery_option': this.navParams.data.delivery_option,
                           'userid': this.navParams.data.user.id,
                           'transac_userid': this.global.user.id,
                           'quantity': this.quantity,
                           'photo': this.photo,
                           'time': this.pickuptime,
                           'status': '1',
                           'proname': this.fpro,
                           'username': this.navParams.data.user.fname,
                        }
                        var none='none'
                        const mymodal = this.modal.create(BasketAddToPage,{data:ddats},mymodaloptions)
                        mymodal.present()
                  },error=>{
                    this.loading.dismissAll();
                    this.global.presentAlert("No Internet/Server Down!")
                  })
      }else{
          const mymodaloptions:ModalOptions = {
            enableBackdropDismiss:false
          }
          var none='none'
          const mymodal = this.modal.create(LogsPage,{data:none},mymodaloptions)
          mymodal.present()
          
      }
    }
  }
  buynow(){
   this.global.presentAlert("Not yet implemented","warning")

  }
}
