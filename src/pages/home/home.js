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
import { NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { PopupOnloadPage } from '../popup-onload/popup-onload';
import { ProductViewPage } from '../product-view/product-view';
import { GlobalProvider } from '../../providers/global/global';
import { ViewProfileFarmerPage } from '../view-profile-farmer/view-profile-farmer';
import { Http, Headers, RequestOptions } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation/ngx';
var HomePage = /** @class */ (function () {
    function HomePage(geolocation, domSanitizer, http, navCtrl, menuCtrl, global) {
        this.geolocation = geolocation;
        this.domSanitizer = domSanitizer;
        this.http = http;
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.global = global;
        this.greenline = '2';
        this.map = 0;
        this.search = '';
        this.markers = [];
        this.od = [];
        if (this.global.popup == 1) {
            this.navCtrl.push(PopupOnloadPage);
            this.global.popup = 2;
        }
        this.greenline = 'vegetables';
        this.loadtemplate('vegetables');
        this.map = 1;
    }
    HomePage.prototype.getlocation = function () {
        // var infowindow = new google.maps.InfoWindow();
        //    this.geolocation.getCurrentPosition().then((resp) => {
        //        alert(resp.coords.latitude +" - "+resp.coords.longitude)
        //    }).catch((error) => {
        //        this.global.presentAlert("Error Getting Location!","warning")
        //    });
    };
    HomePage.prototype.getimage = function (x) {
        return this.domSanitizer.bypassSecurityTrustUrl('data:image/jpeg;charset=utf-8;base64,' + x);
    };
    HomePage.prototype.greenlineactivate = function (x) {
        this.greenline = x;
        this.map = 1;
        this.loadtemplate(x);
    };
    HomePage.prototype.change = function (x) {
        this.map = x;
        if (this.map == 0) {
            this.openmap();
        }
    };
    HomePage.prototype.openmap = function () {
        var _this = this;
        setTimeout(function () {
            var latLng = new google.maps.LatLng(17.625002, 121.727314);
            var mapOptions = {
                center: latLng,
                zoom: 10,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            _this.map2 = new google.maps.Map(_this.mapElement.nativeElement, mapOptions);
            _this.getlocation();
            _this.addMarker();
        }, 150);
    };
    HomePage.prototype.openproduct = function (x) {
        this.navCtrl.push(ProductViewPage, x);
    };
    HomePage.prototype.addMarker = function () {
        var infowindow = new google.maps.InfoWindow();
        var marker, i = 0;
        var get;
        var op = [];
        var navCtrl = this.navCtrl;
        var ViewProfileFarmerPagete = ViewProfileFarmerPage;
        for (var i1 = 0; i1 < this.products.length; ++i1) {
            if (this.products[i1].product.length == 0) {
                // code...
            }
            else {
                for (var i2 = 0; i2 < this.products[i1].product.length; ++i2) {
                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng(parseFloat(this.products[i1].product[i2].lat), parseFloat(this.products[i1].product[i2].lng)),
                        map: this.map2
                    });
                    op.push(this.products[i1].product[i2]);
                    google.maps.event.addListener(marker, 'click', (function (marker, i) {
                        return function () {
                            navCtrl.push(ViewProfileFarmerPagete, op[i]);
                        };
                    })(marker, i));
                    i++;
                }
            }
        }
    };
    HomePage.prototype.openuser = function (x) {
        this.navCtrl.push(ViewProfileFarmerPage, x);
    };
    HomePage.prototype.searchfunc = function () {
        this.map = 1;
        this.products = [];
        for (var i = 0; i < this.searches.length; i++) {
            if (this.searches[i].name.includes(this.search)) {
                this.products.push(this.searches[i]);
            }
        }
        if (this.products.length == 1) {
            this.loaduserprod(this.products[0].name);
            this.pic = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpeg;charset=utf-8;base64,' + this.products[0].photo);
        }
    };
    HomePage.prototype.loaduserprod = function (x) {
        var _this = this;
        this.users = undefined;
        var header = new Headers();
        header.append("Accept", "application/json");
        header.append("Content-Type", "application/x-www-form-urlencoded");
        var option = new RequestOptions({ headers: header });
        var urlSearchParams = new URLSearchParams();
        urlSearchParams.append('name', x);
        urlSearchParams.append('pass', 'frontproductopen');
        var body = urlSearchParams.toString();
        this.http.post(this.global.api, body, option)
            .map(function (response) { return response.json(); })
            .subscribe(function (res) {
            _this.users = res.data;
        }, function (error) {
            _this.users = [];
            _this.global.presentAlert("No Internet/Server Down!", "warning");
        });
    };
    HomePage.prototype.loadtemplate = function (x) {
        var _this = this;
        this.products = undefined;
        var header = new Headers();
        header.append("Accept", "application/json");
        header.append("Content-Type", "application/x-www-form-urlencoded");
        var option = new RequestOptions({ headers: header });
        var urlSearchParams = new URLSearchParams();
        urlSearchParams.append('type', x);
        urlSearchParams.append('pass', 'frontproduct');
        var body = urlSearchParams.toString();
        this.http.post(this.global.api, body, option)
            .map(function (response) { return response.json(); })
            .subscribe(function (res) {
            _this.searches = res.data;
            _this.products = res.data;
        }, function (error) {
            _this.products = [];
            _this.global.presentAlert("No Internet/Server Down!", "warning");
            console.log(error);
        });
    };
    __decorate([
        ViewChild('map2'),
        __metadata("design:type", ElementRef)
    ], HomePage.prototype, "mapElement", void 0);
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [Geolocation,
            DomSanitizer,
            Http, NavController, MenuController, GlobalProvider])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map