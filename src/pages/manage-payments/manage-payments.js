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
import { GlobalProvider } from '../../providers/global/global';
import { PaymentsAddPage } from '../payments-add/payments-add';
/**
 * Generated class for the ManagePaymentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ManagePaymentsPage = /** @class */ (function () {
    function ManagePaymentsPage(navCtrl, navParams, global) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.global = global;
    }
    ManagePaymentsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ManagePaymentsPage');
    };
    ManagePaymentsPage.prototype.enterpage = function () {
        this.navCtrl.push(PaymentsAddPage);
    };
    ManagePaymentsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-manage-payments',
            templateUrl: 'manage-payments.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, GlobalProvider])
    ], ManagePaymentsPage);
    return ManagePaymentsPage;
}());
export { ManagePaymentsPage };
//# sourceMappingURL=manage-payments.js.map