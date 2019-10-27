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
/**
 * Generated class for the ProductViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ProductViewPage = /** @class */ (function () {
    function ProductViewPage(navCtrl, navParams, global) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.global = global;
    }
    ProductViewPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProductViewPage');
    };
    ProductViewPage.prototype.poppage = function () {
        this.navCtrl.pop();
    };
    ProductViewPage.prototype.openuser = function () {
        this.navCtrl.push(ViewProfileFarmerPage);
    };
    ProductViewPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-product-view',
            templateUrl: 'product-view.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, GlobalProvider])
    ], ProductViewPage);
    return ProductViewPage;
}());
export { ProductViewPage };
//# sourceMappingURL=product-view.js.map