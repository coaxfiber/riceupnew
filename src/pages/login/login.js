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
import { RegisterPage } from '../register/register';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ViewProfilePage } from '../view-profile/view-profile';
import { GlobalProvider } from '../../providers/global/global';
import { Storage } from '@ionic/storage'; /**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = /** @class */ (function () {
    function LoginPage(global, loadingCtrl, loadingController, alertCtrl, http, storage, modal, view, navCtrl, navParams) {
        this.global = global;
        this.loadingCtrl = loadingCtrl;
        this.loadingController = loadingController;
        this.alertCtrl = alertCtrl;
        this.http = http;
        this.storage = storage;
        this.modal = modal;
        this.view = view;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.password = '';
        this.email = '';
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.closemodal = function () {
        this.view.dismiss();
    };
    LoginPage.prototype.openregister = function () {
        var mymodaloptions = {
            enableBackdropDismiss: false
        };
        var none = 'none';
        var mymodal = this.modal.create(RegisterPage, { data: none }, mymodaloptions);
        this.view.dismiss();
        mymodal.present();
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        if (this.password == '' || this.email == '') {
            this.global.presentAlert("All fields are required!");
        }
        else if (!this.ValidateEmail(this.email)) {
            this.global.presentAlert("You have entered an invalid email address!");
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
            urlSearchParams.append('email', this.email);
            urlSearchParams.append('password', this.password);
            urlSearchParams.append('pass', 'login');
            var body = urlSearchParams.toString();
            this.http.post(this.global.api, body, option)
                .map(function (response) { return response.json(); })
                .subscribe(function (res) {
                //console.log(res)
                _this.loading.dismissAll();
                if (res.message == 'found') {
                    _this.view.dismiss();
                    _this.global.user = res.data;
                    _this.storage.set('email', _this.email);
                    _this.global.nav.setRoot(ViewProfilePage);
                }
                else {
                    _this.global.presentAlert("Username or password are incorrect!");
                }
                //this.view.dismiss();
                //this.presentAlert("Registration Complete!");
            }, function (error) {
                _this.loading.dismissAll();
                _this.global.presentAlert("No Internet/Server Down!");
            });
        }
    };
    LoginPage.prototype.ValidateEmail = function (mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true);
        }
        return (false);
    };
    LoginPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-login',
            templateUrl: 'login.html',
        }),
        __metadata("design:paramtypes", [GlobalProvider,
            LoadingController,
            LoadingController,
            AlertController,
            Http,
            Storage,
            ModalController,
            ViewController, NavController, NavParams])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map