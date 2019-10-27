var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { Nav } from 'ionic-angular';
import { ViewProfilePage } from '../../pages/view-profile/view-profile';
import { MessagesPage } from '../../pages/messages/messages';
import { BasketPage } from '../../pages/basket/basket';
import { LogsPage } from '../../pages/logs/logs';
/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var GlobalProvider = /** @class */ (function () {
    function GlobalProvider(menuCtrl, storage, alertCtrl) {
        this.menuCtrl = menuCtrl;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.popup = 1;
        this.api = "http://localhost/riceup/";
        //console.log('Hello GlobalProvider Provider');
    }
    GlobalProvider.prototype.menuToggle = function () {
        if (this.menuCtrl.isOpen()) {
            console.log("is open");
        }
        if (this.menuCtrl.isEnabled()) {
            console.log("is enabled");
        }
        this.menuCtrl.toggle();
    };
    GlobalProvider.prototype.presentAlert = function (val) {
        var alert = this.alertCtrl.create({
            title: 'Alert',
            subTitle: val,
            buttons: ['Dismiss']
        });
        alert.present();
    };
    GlobalProvider.prototype.openPage = function (x) {
        console.log(this.nav);
        this.menuCtrl.close();
        if (x == 1) {
            this.nav.setRoot(ViewProfilePage);
        }
        if (x == 2) {
            this.nav.setRoot(HomePage);
        }
        if (x == 3) {
            this.nav.setRoot(MessagesPage);
        }
        if (x == 4) {
            this.nav.setRoot(BasketPage);
        }
        if (x == 5) {
            var mymodaloptions = {
                enableBackdropDismiss: false
            };
            var none = 'none';
            var mymodal = this.modal.create(LogsPage, { data: none }, mymodaloptions);
            mymodal.present();
        }
        if (x == 6) {
            console.log('log');
            this.storage.set('email', null);
            this.user = undefined;
            this.global.user = undefined;
        }
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], GlobalProvider.prototype, "nav", void 0);
    GlobalProvider = __decorate([
        Injectable(),
        Component({
            templateUrl: 'app.html'
        }),
        __metadata("design:paramtypes", [MenuController, Storage, AlertController])
    ], GlobalProvider);
    return GlobalProvider;
}());
export { GlobalProvider };
//# sourceMappingURL=global.js.map