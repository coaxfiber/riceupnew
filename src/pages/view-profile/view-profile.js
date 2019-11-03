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
import { MenuController } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';
import { ProductAddPage } from '../product-add/product-add';
import { ManagePaymentsPage } from '../manage-payments/manage-payments';
import { ProductManagePage } from '../product-manage/product-manage';
import { ProfpicPage } from '../profpic/profpic';
import { SettingsPage } from '../settings/settings';
import { BasketPage } from '../basket/basket';
import { AlertController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
/**
 * Generated class for the ViewProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ViewProfilePage = /** @class */ (function () {
    function ViewProfilePage(actionSheetController, alertCtrl, navCtrl, global, navParams, menuCtrl) {
        this.actionSheetController = actionSheetController;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.global = global;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
    }
    ViewProfilePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ViewProfilePage');
    };
    ViewProfilePage.prototype.enterpage = function (x) {
        if (x == 1) {
            this.navCtrl.push(ProductAddPage);
        }
        if (x == 2) {
            this.navCtrl.push(ProductManagePage);
        }
        if (x == 3) {
            this.navCtrl.push(ManagePaymentsPage);
        }
        if (x == 5) {
            this.navCtrl.push(BasketPage);
        }
    };
    ViewProfilePage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetController.create({
            title: 'Settings',
            buttons: [{
                    text: 'Update User Information',
                    icon: 'create',
                    handler: function () {
                        _this.navCtrl.push(ProfpicPage);
                    }
                }, {
                    text: 'Change Password',
                    icon: 'build',
                    handler: function () {
                        _this.navCtrl.push(SettingsPage);
                    }
                }, {
                    text: 'Cancel',
                    icon: 'close',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }]
        });
        actionSheet.present();
    };
    ViewProfilePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-view-profile',
            templateUrl: 'view-profile.html',
        }),
        __metadata("design:paramtypes", [ActionSheetController,
            AlertController,
            NavController,
            GlobalProvider,
            NavParams,
            MenuController])
    ], ViewProfilePage);
    return ViewProfilePage;
}());
export { ViewProfilePage };
//# sourceMappingURL=view-profile.js.map