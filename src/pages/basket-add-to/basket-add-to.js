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
import { GlobalProvider } from '../../providers/global/global';
import { BasketPage } from '../basket/basket';
/**
 * Generated class for the BasketAddToPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BasketAddToPage = /** @class */ (function () {
    function BasketAddToPage(view, navCtrl, navParams, global) {
        this.view = view;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.global = global;
    }
    BasketAddToPage.prototype.ionViewDidLoad = function () {
        console.log(this.navParams.data);
    };
    BasketAddToPage.prototype.closemodal = function () {
        this.view.dismiss();
    };
    BasketAddToPage.prototype.getcalculate = function () {
        return ((parseFloat(this.navParams.data.data.price) * parseFloat(this.navParams.data.data.quantity)));
    };
    BasketAddToPage.prototype.gotobasket = function () {
        this.view.dismiss();
        this.navCtrl.push(BasketPage);
    };
    BasketAddToPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-basket-add-to',
            templateUrl: 'basket-add-to.html',
        }),
        __metadata("design:paramtypes", [ViewController,
            NavController,
            NavParams,
            GlobalProvider])
    ], BasketAddToPage);
    return BasketAddToPage;
}());
export { BasketAddToPage };
//# sourceMappingURL=basket-add-to.js.map