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
import { IonicPage } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';
import { LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SettingsPage = /** @class */ (function () {
    function SettingsPage(http, loadingCtrl, global) {
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.global = global;
        this.p = '';
        this.np = '';
        this.cp = '';
    }
    SettingsPage.prototype.updatepassword = function () {
        var _this = this;
        if (this.p == '' || this.np == '' || this.cp == '') {
            this.global.presentAlert("All fields with * are required!");
        }
        else if (this.np != this.cp) {
            this.global.presentAlert("New password did not match!");
        }
        else if (this.np == this.p) {
            this.global.presentAlert("New password and current password should not be the same!");
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
            urlSearchParams.append('email', this.global.user.email);
            urlSearchParams.append('p', this.p);
            urlSearchParams.append('np', this.np);
            urlSearchParams.append('pass', 'changepassword');
            var body = urlSearchParams.toString();
            this.http.post(this.global.api, body, option)
                .map(function (response) { return response.json(); })
                .subscribe(function (res) {
                console.log(res);
                _this.loading.dismissAll();
                if (res.message == 'invalid') {
                    _this.global.presentAlert("Incorrect Password!");
                }
                else {
                    _this.global.presentAlert("Password Updated!");
                    _this.p = '';
                    _this.np = '';
                    _this.cp = '';
                }
                //this.view.dismiss();
                //this.presentAlert("Registration Complete!");
            }, function (error) {
                _this.loading.dismissAll();
                _this.global.presentAlert("No Internet/Server Down!");
            });
        }
    };
    SettingsPage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad SettingsPage');
    };
    SettingsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-settings',
            templateUrl: 'settings.html',
        }),
        __metadata("design:paramtypes", [Http,
            LoadingController,
            GlobalProvider])
    ], SettingsPage);
    return SettingsPage;
}());
export { SettingsPage };
//# sourceMappingURL=settings.js.map