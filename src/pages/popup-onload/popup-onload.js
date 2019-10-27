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
/**
 * Generated class for the PopupOnloadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PopupOnloadPage = /** @class */ (function () {
    function PopupOnloadPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    PopupOnloadPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PopupOnloadPage');
    };
    PopupOnloadPage.prototype.closeskip = function () {
        this.navCtrl.pop();
    };
    PopupOnloadPage.prototype.saveit = function () {
        // the url,html tag should be called from here , how ?
        window.open('https://www.youtube.com');
    };
    PopupOnloadPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-popup-onload',
            templateUrl: 'popup-onload.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], PopupOnloadPage);
    return PopupOnloadPage;
}());
export { PopupOnloadPage };
//# sourceMappingURL=popup-onload.js.map