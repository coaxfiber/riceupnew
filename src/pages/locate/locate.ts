import { Component, ViewChild, ElementRef } from '@angular/core';
 
import { GlobalProvider } from '../../providers/global/global';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
 
declare var google;
/**
 * Generated class for the LocatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-locate',
  templateUrl: 'locate.html',
})
export class LocatePage {
@ViewChild('map') mapElement: ElementRef;
 map;
  geocoder = new google.maps.Geocoder;
  markers = [];
  Destination: any;
  MyLocation: any;
  geoAddress: string = '';
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
    opacity='0'
    matches: String[];
    isRecording = false;

    hide=false;

    routes:any
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;
 
  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private navCtrl:NavController,
    public global:GlobalProvider) {
  }
 
 
  ngOnInit() {
    var a=17.625002
    var b=121.727314
    if (this.global.loclat!=undefined) {
      a = this.global.loclat
      b = this.global.loclng

        this.map = new google.maps.Map(document.getElementById('map'), {
          center: { lat: a, lng: b},
          zoom: 10
        });
    }else{
      this.geolocation.getCurrentPosition({timeout: 10000,enableHighAccuracy: true}).then((resp) => {
            this.map = new google.maps.Map(document.getElementById('map'), {
              center: { lat: resp.coords.latitude, lng: resp.coords.longitude},
              zoom: 10
            });
        }).catch((error) => {
            this.map = new google.maps.Map(document.getElementById('map'), {
              center: { lat: 17.625002, lng: 121.727314},
              zoom: 10
            });
        });
    }
  }
  
 locate(){
   var c = this.map.getCenter();
   this.global.loclat = c.lat()
   this.global.loclng = c.lng()
   this.navCtrl.pop();
   //this.getGeoencoder(c.lat(),c.lng())
 }

  getlocation(){
        this.geolocation.getCurrentPosition({timeout: 10000,enableHighAccuracy: true}).then((resp) => {
            this.map = new google.maps.Map(document.getElementById('map'), {
              center: { lat: resp.coords.latitude, lng: resp.coords.longitude},
              zoom: 10
            });
        }).catch((error) => {
          this.map = new google.maps.Map(document.getElementById('map'), {
              center: { lat: resp.coords.latitude, lng: resp.coords.longitude},
              zoom: 10
            }); 
        });
  }
 
getGeoencoder(latitude,longitude){
      this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
      .then((result: NativeGeocoderResult[]) => {
        console.log(this.generateAddress(result[0]))
      })
      .catch((error: any) => {
        alert('Error getting location'+ JSON.stringify(error));
      });
    }
  generateAddress(addressObj){
        let obj = [];
        let address = "";
        for (let key in addressObj) {
          obj.push(addressObj[key]);
        }
        obj.reverse();
        for (let val in obj) {
          if(obj[val].length)
          address += obj[val]+', ';
        }
      return address.slice(0, -2);
    }

}
