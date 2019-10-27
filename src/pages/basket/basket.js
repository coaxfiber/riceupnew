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
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';
import { ModalSalamatPage } from '../modal-salamat/modal-salamat';
/**
 * Generated class for the BasketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BasketPage = /** @class */ (function () {
    function BasketPage(modal, navCtrl, navParams, global) {
        this.modal = modal;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.global = global;
        this.greenline = 1;
    }
    BasketPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BasketPage');
    };
    BasketPage.prototype.greenlineactivate = function (x) {
        this.greenline = x;
    };
    BasketPage.prototype.openmodal = function () {
        var mymodaloptions = {
            enableBackdropDismiss: false
        };
        var none = 'none';
        var mymodal = this.modal.create(ModalSalamatPage, { data: none }, mymodaloptions);
        mymodal.present();
    };
    BasketPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-basket',
            templateUrl: 'basket.html',
        }),
        __metadata("design:paramtypes", [ModalController, NavController, NavParams, GlobalProvider])
    ], BasketPage);
    return BasketPage;
}());
export { BasketPage };
//# sourceMappingURL=basket.js.map