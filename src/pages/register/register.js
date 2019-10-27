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
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { GlobalProvider } from '../../providers/global/global';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RegisterPage = /** @class */ (function () {
    function RegisterPage(loadingCtrl, loadingController, alertCtrl, global, http, modal, view, navCtrl, navParams) {
        this.loadingCtrl = loadingCtrl;
        this.loadingController = loadingController;
        this.alertCtrl = alertCtrl;
        this.global = global;
        this.http = http;
        this.modal = modal;
        this.view = view;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fullname = '';
        this.email = '';
        this.password = '';
        this.cpassword = '';
    }
    RegisterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    RegisterPage.prototype.closemodal = function () {
        this.view.dismiss();
    };
    RegisterPage.prototype.register = function () {
        var _this = this;
        if (this.password == '' || this.fullname == '' || this.email == '') {
            this.global.presentAlert("All fields are required!");
        }
        else if (!this.ValidateEmail(this.email)) {
            this.global.presentAlert("You have entered an invalid email address!");
        }
        else if (this.password != this.cpassword) {
            this.global.presentAlert("Passwords does not match!");
        }
        else {
            this.loading = this.loadingCtrl.create({
                content: '',
            });
            this.loading.present();
            var header = new Headers();
            header.append("Accept", "application/json");
            header.append("Content-Type", "application/x-www-form-urlencoded");
            var option = new RequestOptions({ headers: header });
            var urlSearchParams = new URLSearchParams();
            urlSearchParams.append("full_name", this.fullname);
            urlSearchParams.append('email', this.email);
            urlSearchParams.append('password', this.password);
            urlSearchParams.append('pass', 'register');
            var body = urlSearchParams.toString();
            this.http.post(this.global.api, body, option)
                .map(function (response) { return response.json(); })
                .subscribe(function (res) {
                _this.loading.dismissAll();
                _this.view.dismiss();
                _this.global.presentAlert("Registration Complete!");
            }, function (error) {
                _this.loading.dismissAll();
                _this.global.presentAlert("No Internet/Server Down!");
            });
        }
    };
    RegisterPage.prototype.ValidateEmail = function (mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true);
        }
        return (false);
    };
    RegisterPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-register',
            templateUrl: 'register.html',
        }),
        __metadata("design:paramtypes", [LoadingController, LoadingController, AlertController, GlobalProvider, Http, ModalController, ViewController, NavController, NavParams])
    ], RegisterPage);
    return RegisterPage;
}());
export { RegisterPage };
//# sourceMappingURL=register.js.map