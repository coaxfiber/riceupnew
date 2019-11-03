import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { PopupOnloadPage } from '../popup-onload/popup-onload';
import { ProductViewPage } from '../product-view/product-view';
import { GlobalProvider } from '../../providers/global/global';
import { ViewProfileFarmerPage } from '../view-profile-farmer/view-profile-farmer';

import {Http, Headers, RequestOptions} from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
 
declare var google;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	greenline = '2';
	map = 0

  products
  searches
  search=''

  users
  pic

  geo
@ViewChild('map2') mapElement: ElementRef;
 map2;
  constructor( 
    private geolocation: Geolocation,
  private domSanitizer: DomSanitizer, 
  private http: Http,public navCtrl: NavController,public menuCtrl: MenuController,public global:GlobalProvider) {
    if (this.global.popup == 1) {
      this.navCtrl.push(PopupOnloadPage);
      this.global.popup=2;
    }
    this.greenline = 'vegetables'
     this.loadtemplate('vegetables')


    this.map=1;

    this.geo=undefined;         
  }

  getlocation(){
        this.geolocation.getCurrentPosition({timeout: 10000,enableHighAccuracy: true}).then((resp) => {
          alert(resp.coords.latitude +" - "+resp.coords.longitude)
        }).catch((error) => {
          alert('Error getting location'+ JSON.stringify(error));
        });
  }



  getimage(x){
    return this.domSanitizer.bypassSecurityTrustUrl('data:image/jpeg;charset=utf-8;base64,' + x);
  }
  greenlineactivate(x){
	  this.greenline = x;
    this.map = 1
    this.loadtemplate(x)
  }

 change(x){
   this.map = x
   if (this.map == 0) {
     this.openmap()
   }
   
 }
 markers=[]
 openmap(){
   setTimeout(() => {
     if (this.geo==undefined) {
        //this.getlocation();
        this.geo=1
     }
let latLng = new google.maps.LatLng(17.625002, 121.727314);

let mapOptions = {
  center: latLng,
  zoom: 10,
  mapTypeId: google.maps.MapTypeId.ROADMAP
}

this.map2 = new google.maps.Map(this.mapElement.nativeElement, mapOptions);  
//this.getlocation()  
this.addMarker()
    },150);
    }

 openproduct(x: any){
     this.navCtrl.push(ProductViewPage,x);
 }

od=[]
 addMarker(){
var infowindow = new google.maps.InfoWindow();

var marker, i=0;
    var get;
    var op=[]
    var navCtrl=this.navCtrl
    var ViewProfileFarmerPagete = ViewProfileFarmerPage
            for (var i1 = 0; i1 < this.products.length; ++i1) {
              if (this.products[i1].product.length==0) {
                // code...
              }else{
                for (var i2 = 0; i2 < this.products[i1].product.length; ++i2) { 
                      marker = new google.maps.Marker({
                        position: new google.maps.LatLng( parseFloat(this.products[i1].product[i2].lat), parseFloat(this.products[i1].product[i2].lng)),
                        map: this.map2,
                        animation: google.maps.Animation.DROP
                      });

                      op.push(this.products[i1].product[i2])
                      google.maps.event.addListener(marker, 'click', (function(marker, i) {
                        return function() {
                          navCtrl.push(ViewProfileFarmerPagete,op[i]);
                        }
                      })(marker, i));

                    i++
                }
              }
            }
}

  openuser(x){
      this.navCtrl.push(ViewProfileFarmerPage,x);
  }
  searchfunc(){
    this.map =1
    this.products=[]
   for (var i = 0;i<this.searches.length; i++) {
     if (this.searches[i].name.includes(this.search)) {
       this.products.push(this.searches[i])
     }
   }
   if (this.products.length==1) {
      this.loaduserprod(this.products[0].name)
      this.pic=this.domSanitizer.bypassSecurityTrustUrl('data:image/jpeg;charset=utf-8;base64,' + this.products[0].photo)

   }
  }

 loaduserprod(x){
   this.users=undefined;
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
             this.users=res.data

          },error=>{
            this.users=[]
            this.global.presentAlert("No Internet/Server Down!","warning")
          })
 }


 loadtemplate(x){
   this.products=undefined;
    var header = new Headers();
        header.append("Accept", "application/json");
        header.append("Content-Type", "application/x-www-form-urlencoded");    
        let option = new RequestOptions({ headers: header });

        let urlSearchParams = new URLSearchParams();
           urlSearchParams.append('type', x);
           urlSearchParams.append('pass', 'frontproduct');
        let body = urlSearchParams.toString()

     this.http.post(this.global.api,body,option)
          .map(response => response.json())
          .subscribe(res => {
             this.searches=res.data
             this.products=res.data
             
          },error=>{
            this.products=[]
            this.global.presentAlert("No Internet/Server Down!","warning")
            console.log(error  )
          })
 }

}
