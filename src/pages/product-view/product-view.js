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
import { ViewProfileFarmerPage } from '../view-profile-farmer/view-profile-farmer';
import { GlobalProvider } from '../../providers/global/global';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { DomSanitizer } from '@angular/platform-browser';
/**
 * Generated class for the ProductViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ProductViewPage = /** @class */ (function () {
    function ProductViewPage(domSanitizer, http, navCtrl, navParams, global) {
        this.domSanitizer = domSanitizer;
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.global = global;
        this.loaduserprod(navParams.data.name);
        this.pic = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpeg;charset=utf-8;base64,' + navParams.data.photo);
    }
    ProductViewPage.prototype.loaduserprod = function (x) {
        var _this = this;
        this.products = undefined;
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
            _this.products = res.data;
            //this.view.dismiss();
            //this.presentAlert("Registration Complete!");
        }, function (error) {
            _this.products = [];
            _this.global.presentAlert("No Internet/Server Down!", "warning");
        });
    };
    ProductViewPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProductViewPage');
    };
    ProductViewPage.prototype.poppage = function () {
        this.navCtrl.pop();
    };
    ProductViewPage.prototype.openuser = function (x) {
        this.navCtrl.push(ViewProfileFarmerPage, x);
    };
    ProductViewPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-product-view',
            templateUrl: 'product-view.html',
        }),
        __metadata("design:paramtypes", [DomSanitizer,
            Http, NavController, NavParams, GlobalProvider])
    ], ProductViewPage);
    return ProductViewPage;
}());
export { ProductViewPage };
//# sourceMappingURL=product-view.js.map