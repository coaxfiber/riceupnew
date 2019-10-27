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
import { NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { PopupOnloadPage } from '../popup-onload/popup-onload';
import { ProductViewPage } from '../product-view/product-view';
import { GlobalProvider } from '../../providers/global/global';
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, menuCtrl, global) {
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.global = global;
        this.greenline = 2;
        this.map = 1;
        if (this.global.popup == 1) {
            this.navCtrl.push(PopupOnloadPage);
            this.global.popup = 2;
        }
    }
    HomePage.prototype.greenlineactivate = function (x) {
        this.greenline = x;
    };
    HomePage.prototype.change = function (x) {
        this.map = x;
    };
    HomePage.prototype.openproduct = function (x) {
        this.navCtrl.push(ProductViewPage);
    };
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [NavController, MenuController, GlobalProvider])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map