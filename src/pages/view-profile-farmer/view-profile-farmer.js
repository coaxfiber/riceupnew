var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { DomSanitizer } from '@angular/platform-browser';
import { Select } from 'ionic-angular';
import { LogsPage } from '../logs/logs';
import { BasketAddToPage } from '../basket-add-to/basket-add-to';
import { ModalController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
/**
 * Generated class for the ViewProfileFarmerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ViewProfileFarmerPage = /** @class */ (function () {
    function ViewProfileFarmerPage(loadingCtrl, domSanitizer, modal, http, navCtrl, navParams, global) {
        this.loadingCtrl = loadingCtrl;
        this.domSanitizer = domSanitizer;
        this.modal = modal;
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.global = global;
        this.quantity = 1;
        this.doption = '';
        this.pickup = [];
        this.pickuptime = '';
        this.openpro = [];
        this.map = 1;
        console.log(this.navParams.data);
        this.getprobyuser();
    }
    ViewProfileFarmerPage_1 = ViewProfileFarmerPage;
    ViewProfileFarmerPage.prototype.poppage = function () {
        this.navCtrl.pop();
    };
    ViewProfileFarmerPage.prototype.getprobyuser = function () {
        var _this = this;
        var header = new Headers();
        header.append("Accept", "application/json");
        header.append("Content-Type", "application/x-www-form-urlencoded");
        var option = new RequestOptions({ headers: header });
        var urlSearchParams = new URLSearchParams();
        urlSearchParams.append('pass', 'getprobyid');
        var body = urlSearchParams.toString();
        this.otherpro == undefined;
        this.http.post(this.global.api, body, option)
            .map(function (response) { return response.json(); })
            .subscribe(function (res) {
            _this.otherpro = [];
            for (var i = 0; i < res.data.length; ++i) {
                if (res.data[i].product.length == 0) {
                    // code...
                }
                else {
                    for (var i2 = 0; i2 < res.data[i].product.length; ++i2) {
                        if (res.data[i].product[i2].name == _this.navParams.data.name) {
                            _this.photo = res.data[i].photo;
                            _this.fpro = res.data[i].name;
                        }
                        else {
                            if (res.data[i].product[i2].user.id == _this.navParams.data.user.id) {
                                _this.otherpro.push(res.data[i]);
                                _this.openpro.push(res.data[i].product[i2]);
                            }
                        }
                    }
                }
            }
        }, function (error) {
            _this.global.presentAlert("No Internet/Server Down!", "warning");
        });
    };
    ViewProfileFarmerPage.prototype.openmap = function () {
        var _this = this;
        setTimeout(function () {
            var latLng = new google.maps.LatLng(_this.navParams.data.lng, _this.navParams.data.lat);
            var mapOptions = {
                center: latLng,
                zoom: 10,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            _this.map3 = new google.maps.Map(_this.mapElement.nativeElement, mapOptions);
            _this.getlocation();
            _this.addMarker();
        }, 150);
    };
    ViewProfileFarmerPage.prototype.openself = function (x) {
        this.navCtrl.pop();
        this.navCtrl.push(ViewProfileFarmerPage_1, this.openpro[x]);
    };
    ViewProfileFarmerPage.prototype.getlocation = function () {
    };
    ViewProfileFarmerPage.prototype.addMarker = function () {
        var infowindow = new google.maps.InfoWindow();
        var marker;
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(parseFloat(this.navParams.data.lat), parseFloat(this.navParams.data.lng)),
            map: this.map3
        });
    };
    ViewProfileFarmerPage.prototype.openselect = function () {
        this.mySelect.open();
    };
    ViewProfileFarmerPage.prototype.openselect2 = function () {
        this.mySelect2.open();
    };
    ViewProfileFarmerPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.getpickuptime();
        var header = new Headers();
        header.append("Accept", "application/json");
        header.append("Content-Type", "application/x-www-form-urlencoded");
        var option = new RequestOptions({ headers: header });
        var urlSearchParams = new URLSearchParams();
        urlSearchParams.append('id', this.navParams.data.id);
        urlSearchParams.append('pass', 'getpicproduct');
        var body = urlSearchParams.toString();
        this.http.post(this.global.api, body, option)
            .map(function (response) { return response.json(); })
            .subscribe(function (res) {
            //console.log(res.data)
            _this.slides = res.data;
            //this.view.dismiss();
            //this.presentAlert("Registration Complete!");
        }, function (error) {
            _this.global.presentAlert("No Internet/Server Down!", "warning");
        });
    };
    ViewProfileFarmerPage.prototype.getpickuptime = function () {
        var _this = this;
        var header = new Headers();
        header.append("Accept", "application/json");
        header.append("Content-Type", "application/x-www-form-urlencoded");
        var option = new RequestOptions({ headers: header });
        var urlSearchParams = new URLSearchParams();
        urlSearchParams.append('id', this.navParams.data.id);
        urlSearchParams.append('pass', 'getPickupTime');
        var body = urlSearchParams.toString();
        this.http.post(this.global.api, body, option)
            .map(function (response) { return response.json(); })
            .subscribe(function (res) {
            _this.pickup = res.data;
            //this.view.dismiss();
            //this.presentAlert("Registration Complete!");
        }, function (error) {
            _this.global.presentAlert("No Internet/Server Down!", "warning");
        });
    };
    ViewProfileFarmerPage.prototype.changemap = function (x) {
        this.map = x;
        if (this.map == 0) {
            this.openmap();
        }
    };
    ViewProfileFarmerPage.prototype.addtobasket = function () {
        var _this = this;
        var x = '';
        if (this.quantity < 1) {
            x = x + '*Quantity must not be less than 0.<br>';
        }
        if (this.quantity > this.navParams.data.stock) {
            x = x + '*Quantity must not be greater than QTY AVAILABLE.<br>';
        }
        if (this.doption == '') {
            x = x + '*Please select a delivery option.<br>';
        }
        else {
            if (this.doption == 'pickup') {
                if (this.pickuptime == '') {
                    x = x + '*Please choose a pickup time.<br>';
                }
            }
        }
        if (x != '') {
            this.global.presentAlert(x, "warning");
        }
        else {
            if (this.global.user != undefined) {
                if (this.doption != 'pickup') {
                    this.pickuptime = '';
                }
                this.loading = this.loadingCtrl.create({
                    content: '',
                });
                this.loading.present();
                var header = new Headers();
                header.append("Accept", "application/json");
                header.append("Content-Type", "application/x-www-form-urlencoded");
                var option = new RequestOptions({ headers: header });
                var urlSearchParams = new URLSearchParams();
                urlSearchParams.append('product_id', this.navParams.data.id.toString());
                urlSearchParams.append('name', this.navParams.data.name);
                urlSearchParams.append('descrip', this.navParams.data.descrip);
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
                urlSearchParams.append('time', this.pickuptime);
                urlSearchParams.append('status', '1');
                urlSearchParams.append('proname', this.fpro);
                urlSearchParams.append('username', this.navParams.data.user.fname);
                urlSearchParams.append('pass', 'addtobasket');
                var body = urlSearchParams.toString();
                this.http.post(this.global.api, body, option)
                    .map(function (response) { return response.text(); })
                    .subscribe(function (res) {
                    _this.loading.dismissAll();
                    var mymodaloptions = {
                        enableBackdropDismiss: false
                    };
                    var ddats = {
                        'product_id': _this.navParams.data.id,
                        'name': _this.navParams.data.name,
                        'descrip': _this.navParams.data.descrip,
                        'location': _this.navParams.data.location,
                        'min_order': _this.navParams.data.min_order,
                        'stock': _this.navParams.data.stock,
                        'lat': _this.navParams.data.lat,
                        'lng': _this.navParams.data.lng,
                        'price': _this.navParams.data.price,
                        'delivery_option': _this.navParams.data.delivery_option,
                        'userid': _this.navParams.data.user.id,
                        'transac_userid': _this.global.user.id,
                        'quantity': _this.quantity,
                        'photo': _this.photo,
                        'time': _this.pickuptime,
                        'status': '1',
                        'proname': _this.fpro,
                        'username': _this.navParams.data.user.fname,
                    };
                    var none = 'none';
                    var mymodal = _this.modal.create(BasketAddToPage, { data: ddats }, mymodaloptions);
                    mymodal.present();
                }, function (error) {
                    _this.loading.dismissAll();
                    _this.global.presentAlert("No Internet/Server Down!");
                });
            }
            else {
                var mymodaloptions = {
                    enableBackdropDismiss: false
                };
                var none = 'none';
                var mymodal = this.modal.create(LogsPage, { data: none }, mymodaloptions);
                mymodal.present();
            }
        }
    };
    ViewProfileFarmerPage.prototype.buynow = function () {
        this.global.presentAlert("Not yet implemented", "warning");
    };
    var ViewProfileFarmerPage_1;
    __decorate([
        ViewChild('mySelect'),
        __metadata("design:type", Select)
    ], ViewProfileFarmerPage.prototype, "mySelect", void 0);
    __decorate([
        ViewChild('mySelect2'),
        __metadata("design:type", Select)
    ], ViewProfileFarmerPage.prototype, "mySelect2", void 0);
    __decorate([
        ViewChild('map3'),
        __metadata("design:type", ElementRef)
    ], ViewProfileFarmerPage.prototype, "mapElement", void 0);
    ViewProfileFarmerPage = ViewProfileFarmerPage_1 = __decorate([
        IonicPage(),
        Component({
            selector: 'page-view-profile-farmer',
            templateUrl: 'view-profile-farmer.html',
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [LoadingController,
            DomSanitizer,
            ModalController,
            Http, NavController, NavParams, GlobalProvider])
    ], ViewProfileFarmerPage);
    return ViewProfileFarmerPage;
}());
export { ViewProfileFarmerPage };
//# sourceMappingURL=view-profile-farmer.js.map