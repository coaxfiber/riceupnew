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
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { ModalSalamatPage } from '../modal-salamat/modal-salamat';
/**
 * Generated class for the BasketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BasketPage = /** @class */ (function () {
    function BasketPage(http, modal, navCtrl, navParams, global) {
        this.http = http;
        this.modal = modal;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.global = global;
        this.greenline = 1;
    }
    BasketPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BasketPage');
        this.loadpro(1);
    };
    BasketPage.prototype.greenlineactivate = function (x) {
        this.greenline = x;
        this.loadpro(x);
    };
    BasketPage.prototype.openmodal = function () {
        var mymodaloptions = {
            enableBackdropDismiss: false
        };
        var none = 'none';
        var mymodal = this.modal.create(ModalSalamatPage, { data: none }, mymodaloptions);
        mymodal.present();
    };
    BasketPage.prototype.loadpro = function (x) {
        var _this = this;
        this.pros = undefined;
        var header = new Headers();
        header.append("Accept", "application/json");
        header.append("Content-Type", "application/x-www-form-urlencoded");
        var option = new RequestOptions({ headers: header });
        var urlSearchParams = new URLSearchParams();
        urlSearchParams.append('id', this.global.user.id);
        urlSearchParams.append('status', x);
        urlSearchParams.append('pass', 'getbasket');
        var body = urlSearchParams.toString();
        this.http.post(this.global.api, body, option)
            .map(function (response) { return response.json(); })
            .subscribe(function (res) {
            _this.pros = res.data;
            console.log(res.data);
        }, function (error) {
            _this.pros = [];
            _this.global.presentAlert("No Internet/Server Down!", "warning");
        });
    };
    BasketPage.prototype.getcalc = function (a, b) {
        var x = parseFloat(b);
        var y = parseFloat(a);
        var n = (x * y);
        var ret = parseFloat(n).toFixed(2);
        return ret;
    };
    BasketPage.prototype.getotal = function () {
        c = 0;
        c = 0;
        for (var i = 0; i < this.pros.length; ++i) {
            c = this.pros;
        }
    };
    BasketPage.prototype.checkdelivery = function (a) {
        if (a != '') {
            return "PICKUP";
        }
        else
            return "DELIVERY";
    };
    BasketPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-basket',
            templateUrl: 'basket.html',
        }),
        __metadata("design:paramtypes", [Http,
            ModalController,
            NavController,
            NavParams,
            GlobalProvider])
    ], BasketPage);
    return BasketPage;
}());
export { BasketPage };
//# sourceMappingURL=basket.js.map