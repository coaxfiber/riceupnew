var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef } from '@angular/core';
import { GlobalProvider } from '../../providers/global/global';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
/**
 * Generated class for the LocatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LocatePage = /** @class */ (function () {
    function LocatePage(geolocation, nativeGeocoder, navCtrl, global) {
        this.geolocation = geolocation;
        this.nativeGeocoder = nativeGeocoder;
        this.navCtrl = navCtrl;
        this.global = global;
        this.geocoder = new google.maps.Geocoder;
        this.markers = [];
        this.geoAddress = '';
        this.geoencoderOptions = {
            useLocale: true,
            maxResults: 5
        };
        this.opacity = '0';
        this.isRecording = false;
        this.hide = false;
        this.directionsService = new google.maps.DirectionsService;
        this.directionsDisplay = new google.maps.DirectionsRenderer;
    }
    LocatePage.prototype.ngOnInit = function () {
        var a = 17.625002;
        var b = 121.727314;
        if (this.global.loclat != undefined) {
            a = this.global.loclat;
            b = this.global.loclng;
        }
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: a, lng: b },
            zoom: 13
        });
        //this.tryGeolocation();
        var pos = {
            lat: 17.647857,
            lng: 121.674139
        };
        this.MyLocation = new google.maps.LatLng(pos);
        var pos2 = {
            lat: 17.620048,
            lng: 121.704997
        };
        this.Destination = new google.maps.LatLng(pos2);
        this.map.addListener("click", function (event) {
            var lat = event.latLng.lat();
            var lng = event.latLng.lng();
            console.log("Lat: " + lat + "  Lng: " + lng);
        });
    };
    LocatePage.prototype.locate = function () {
        var c = this.map.getCenter();
        this.global.loclat = c.lat();
        this.global.loclng = c.lng();
        this.navCtrl.pop();
        //this.getGeoencoder(c.lat(),c.lng())
    };
    LocatePage.prototype.getGeoencoder = function (latitude, longitude) {
        var _this = this;
        this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
            .then(function (result) {
            console.log(_this.generateAddress(result[0]));
        })
            .catch(function (error) {
            alert('Error getting location' + JSON.stringify(error));
        });
    };
    LocatePage.prototype.generateAddress = function (addressObj) {
        var obj = [];
        var address = "";
        for (var key in addressObj) {
            obj.push(addressObj[key]);
        }
        obj.reverse();
        for (var val in obj) {
            if (obj[val].length)
                address += obj[val] + ', ';
        }
        return address.slice(0, -2);
    };
    __decorate([
        ViewChild('map'),
        __metadata("design:type", ElementRef)
    ], LocatePage.prototype, "mapElement", void 0);
    LocatePage = __decorate([
        Component({
            selector: 'page-locate',
            templateUrl: 'locate.html',
        }),
        __metadata("design:paramtypes", [Geolocation,
            NativeGeocoder,
            NavController,
            GlobalProvider])
    ], LocatePage);
    return LocatePage;
}());
export { LocatePage };
//# sourceMappingURL=locate.js.map