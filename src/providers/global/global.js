var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var GlobalProvider = /** @class */ (function () {
    function GlobalProvider(domSanitizer, menuCtrl, storage, alertCtrl) {
        this.domSanitizer = domSanitizer;
        this.menuCtrl = menuCtrl;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.popup = 1;
        //api="http://eltonbagne.info/api/riceup/";
        this.api = "http://192.168.1.2/riceup/";
        console.log('Hello GlobalProvider Provider');
    }
    GlobalProvider.prototype.menuToggle = function () {
        this.menuCtrl.toggle();
    };
    GlobalProvider.prototype.presentAlert = function (val, val1) {
        if (val1 === void 0) { val1 = "Alert"; }
        var alert = this.alertCtrl.create({
            title: val1,
            subTitle: val,
            buttons: ['Dismiss']
        });
        alert.present();
    };
    GlobalProvider.prototype.checkphoto = function (x) {
        if (x == '') {
            return 'assets/imgs/no-profile-image.jpg';
        }
        else {
            return this.domSanitizer.bypassSecurityTrustUrl('data:image/jpeg;charset=utf-8;base64,' + x);
        }
    };
    GlobalProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [DomSanitizer,
            MenuController, Storage, AlertController])
    ], GlobalProvider);
    return GlobalProvider;
}());
export { GlobalProvider };
//# sourceMappingURL=global.js.map