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
import { LoginPage } from '../login/login';
import { GlobalProvider } from '../../providers/global/global';
/**
 * Generated class for the LogsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LogsPage = /** @class */ (function () {
    function LogsPage(global, modal, view, navCtrl, navParams) {
        this.global = global;
        this.modal = modal;
        this.view = view;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    LogsPage.prototype.ionViewDidLoad = function () {
    };
    LogsPage.prototype.closemodal = function () {
        this.view.dismiss();
    };
    LogsPage.prototype.email = function () {
        this.global.presentAlert("Not yet implemented", "Warning");
    };
    LogsPage.prototype.openlogin = function () {
        var mymodaloptions = {
            enableBackdropDismiss: false
        };
        var none = 'none';
        var mymodal = this.modal.create(LoginPage, { data: none }, mymodaloptions);
        this.view.dismiss();
        mymodal.present();
    };
    LogsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-logs',
            templateUrl: 'logs.html',
        }),
        __metadata("design:paramtypes", [GlobalProvider, ModalController, ViewController, NavController, NavParams])
    ], LogsPage);
    return LogsPage;
}());
export { LogsPage };
//# sourceMappingURL=logs.js.map