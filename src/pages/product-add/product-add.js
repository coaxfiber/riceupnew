var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';
import { ModalController } from 'ionic-angular';
import { LocatePage } from '../locate/locate';
import { Camera } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
/**
 * Generated class for the ProductAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ProductAddPage = /** @class */ (function () {
    function ProductAddPage(http, alertCtrl, loadingCtrl, domSanitizer, camera, transfer, modal, navCtrl, navParams, global) {
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.domSanitizer = domSanitizer;
        this.camera = camera;
        this.transfer = transfer;
        this.modal = modal;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.global = global;
        this.name = '';
        this.desc = '';
        this.address = '';
        this.unit = '';
        this.pics = [];
        this.send = [];
        this.dp = false;
        this.dd = false;
        this.start = '';
        this.end = '';
        this.day = '';
        this.add = false;
        this.pickup = [];
    }
    ProductAddPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProductAddPage');
        this.global.loclat = undefined;
        this.global.loclng = undefined;
    };
    ProductAddPage.prototype.pushpickup = function () {
        this.pickup.push(this.tConvert(this.start) + " to " + this.tConvert(this.end) + " " + this.day);
        this.start = '';
        this.end = '';
        this.day = '';
        this.add = false;
    };
    ProductAddPage.prototype.pushpickupcancel = function () {
        this.start = '';
        this.end = '';
        this.day = '';
        this.add = false;
    };
    ProductAddPage.prototype.poppage = function () {
        this.navCtrl.pop();
    };
    ProductAddPage.prototype.locate = function () {
        this.navCtrl.push(LocatePage);
    };
    ProductAddPage.prototype.tConvert = function (time) {
        // Check correct time format and split into components
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
        if (time.length > 1) { // If time format correct
            time = time.slice(1); // Remove full string match value
            time[5] = +time[0] < 12 ? ' am' : ' pm'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join(''); // return adjusted time or original string
    };
    ProductAddPage.prototype.addchange = function () {
        if (this.add == true) {
            this.add = false;
        }
        else
            this.add = true;
    };
    ProductAddPage.prototype.upload = function () {
        var _this = this;
        var options = {
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.DATA_URL,
            targetWidth: 375,
            targetHeight: 375,
            allowEdit: true
        };
        this.camera.getPicture(options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            _this.send.push(imageData);
            _this.pics.push(_this.domSanitizer.bypassSecurityTrustUrl('data:image/jpeg;charset=utf-8;base64,' + imageData));
        }, function (err) {
            // Handle error
        });
    };
    ProductAddPage.prototype.remove = function (s) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Remove image?',
            message: '',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.pics.splice(parseInt(s), 1);
                        _this.send.splice(parseInt(s), 1);
                    }
                }
            ]
        });
        alert.present();
    };
    ProductAddPage.prototype.removepickup = function (s) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Remove pickup time?',
            message: '',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.pickup.splice(parseInt(s), 1);
                    }
                }
            ]
        });
        alert.present();
    };
    ProductAddPage.prototype.addproduct = function () {
        var _this = this;
        var x = '';
        if (this.name == '') {
            x = x + '*Product name is required.<br>';
        }
        if (this.desc == '') {
            x = x + '*Product Description is required.<br>';
        }
        if (this.address == '') {
            x = x + '*Address is required.<br>';
        }
        if (this.global.loclat == undefined) {
            x = x + '*Product Location is required (click the locate button).<br>';
        }
        if (this.unit == undefined) {
            x = x + '*Min order is required.<br>';
        }
        if (this.price == undefined) {
            x = x + '*Price is required.<br>';
        }
        if (this.stock == undefined) {
            x = x + '*Stock is required.<br>';
        }
        if (this.dd == false && this.dp == false) {
            x = x + '*Check at least one Delivery Option.<br>';
        }
        if (this.pics.length == 0) {
            x = x + '*Upload at least 1 photo.<br>';
        }
        if (this.dp == true) {
            if (this.pickup.length == 0) {
                x = x + '*Must have at least 1 pickup schedule.<br>';
            }
        }
        if (x == '') {
            var delivery_option = '';
            if (this.dd == true && this.dp == true) {
                delivery_option = '3';
            }
            if (this.dd == true && this.dp == false) {
                delivery_option = '1';
            }
            if (this.dd == false && this.dp == true) {
                delivery_option = '2';
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
            var body = urlSearchParams.toString();
            this.http.post(this.global.api, body, option)
                .map(function (response) { return response.json(); })
                .subscribe(function (res) {
                console.log(res);
                if (res.message == 'found') {
                    _this.addpics(res.data, 0);
                    _this.addpickup(res.data, 0);
                }
                else {
                }
            }, function (error) {
                _this.loading.dismissAll();
                _this.global.presentAlert("No Internet/Server Down!");
            });
        }
        else {
            this.global.presentAlert(x, 'Warning');
        }
    };
    ProductAddPage.prototype.addpickup = function (a, y) {
        var _this = this;
        if (y < this.pickup.length) {
            var header = new Headers();
            header.append("Accept", "application/json");
            header.append("Content-Type", "application/x-www-form-urlencoded");
            var option = new RequestOptions({ headers: header });
            var urlSearchParams = new URLSearchParams();
            urlSearchParams.append('id', a);
            urlSearchParams.append('time', this.pickup[y]);
            urlSearchParams.append('pass', 'addPickupTime');
            var body = urlSearchParams.toString();
            this.http.post(this.global.api, body, option)
                .map(function (response) { return response.json(); })
                .subscribe(function (res) {
                y++;
                console.log(res);
                if (res.message == 'found') {
                    _this.addpickup(a, y);
                }
                else {
                }
                //this.view.dismiss();
                //this.presentAlert("Registration Complete!");
            }, function (error) {
                _this.loading.dismissAll();
                _this.global.presentAlert("No Internet/Server Down!");
            }); // code...
        }
    };
    ProductAddPage.prototype.addpics = function (x, y) {
        var _this = this;
        if (y < this.pics.length) {
            var header = new Headers();
            header.append("Accept", "application/json");
            header.append("Content-Type", "application/x-www-form-urlencoded");
            var option = new RequestOptions({ headers: header });
            var urlSearchParams = new URLSearchParams();
            urlSearchParams.append('product_id', x);
            urlSearchParams.append('photo', this.send[y]);
            urlSearchParams.append('pass', 'newproductpic');
            var body = urlSearchParams.toString();
            this.http.post(this.global.api, body, option)
                .map(function (response) { return response.json(); })
                .subscribe(function (res) {
                y++;
                if (res.message == 'found') {
                    _this.addpics(x, y);
                }
                else {
                }
                //this.view.dismiss();
                //this.presentAlert("Registration Complete!");
            }, function (error) {
                _this.loading.dismissAll();
                _this.global.presentAlert("No Internet/Server Down!");
            }); // code...
        }
        else {
            this.loading.dismissAll();
            this.navCtrl.pop();
            this.global.presentAlert("Product Added!", "Success");
        }
    };
    ProductAddPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-product-add',
            templateUrl: 'product-add.html',
        }),
        __metadata("design:paramtypes", [Http,
            AlertController,
            LoadingController,
            DomSanitizer,
            Camera,
            FileTransfer, ModalController, NavController, NavParams, GlobalProvider])
    ], ProductAddPage);
    return ProductAddPage;
}());
export { ProductAddPage };
//# sourceMappingURL=product-add.js.map