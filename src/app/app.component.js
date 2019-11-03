var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ModalController } from 'ionic-angular';
import { HomePage, } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ViewProfilePage } from '../pages/view-profile/view-profile';
import { MessagesPage } from '../pages/messages/messages';
import { BasketPage } from '../pages/basket/basket';
import { LogsPage } from '../pages/logs/logs';
import { FavoritesPage } from '../pages/favorites/favorites';
import { ProfpicPage } from '../pages/profpic/profpic';
import { SettingsPage } from '../pages/settings/settings';
import { MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../providers/global/global';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
var MyApp = /** @class */ (function () {
    function MyApp(actionSheetController, alertCtrl, loadingCtrl, http, storage, global, modal, menuCtrl, platform, statusBar, splashScreen) {
        this.actionSheetController = actionSheetController;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.http = http;
        this.storage = storage;
        this.global = global;
        this.modal = modal;
        this.menuCtrl = menuCtrl;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = HomePage;
        this.initializeApp();
        this.getunits();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: HomePage },
            { title: 'List', component: ListPage }
        ];
    }
    MyApp.prototype.alertConfirm = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm Logout',
            message: 'are you sure you want to Logout?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.storage.set('email', null);
                        _this.user = undefined;
                        _this.global.user = undefined;
                        _this.nav.setRoot(HomePage);
                    }
                }
            ]
        });
        alert.present();
    };
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
        this.storage.get('email').then(function (val) {
            console.log(val);
            if (val != null && val != '') {
                var header = new Headers();
                header.append("Accept", "application/json");
                header.append("Content-Type", "application/x-www-form-urlencoded");
                var option = new RequestOptions({ headers: header });
                var x = _this.storage.get('email');
                var urlSearchParams = new URLSearchParams();
                urlSearchParams.append('email', val);
                urlSearchParams.append('pass', 'userinfo');
                var body = urlSearchParams.toString();
                _this.http.post(_this.global.api, body, option)
                    .map(function (response) { return response.json(); })
                    .subscribe(function (res) {
                    //console.log(res)
                    _this.global.user = res.data;
                    _this.user = res.data;
                    console.log(_this.user);
                    //this.view.dismiss();
                    //this.presentAlert("Registration Complete!");
                }, function (error) {
                    _this.global.presentAlert("No Internet/Server Down!");
                });
            }
        });
    };
    MyApp.prototype.getunits = function () {
        var _this = this;
        var header = new Headers();
        header.append("Accept", "application/json");
        header.append("Content-Type", "application/x-www-form-urlencoded");
        var option = new RequestOptions({ headers: header });
        var urlSearchParams = new URLSearchParams();
        urlSearchParams.append('pass', 'units');
        var body = urlSearchParams.toString();
        this.http.post(this.global.api, body, option)
            .map(function (response) { return response.json(); })
            .subscribe(function (res) {
            console.log(res);
            _this.global.units = res.data;
            //this.view.dismiss();
            //this.presentAlert("Registration Complete!");
        });
    };
    MyApp.prototype.openPage = function (x) {
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
            this.alertConfirm();
        }
        if (x == 7) {
            this.nav.setRoot(FavoritesPage);
        }
        if (x == 8) {
            this.presentActionSheet();
        }
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
    };
    MyApp.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetController.create({
            title: 'Settings',
            buttons: [{
                    text: 'Update User Information',
                    icon: 'create',
                    handler: function () {
                        _this.nav.push(ProfpicPage);
                    }
                }, {
                    text: 'Change Password',
                    icon: 'build',
                    handler: function () {
                        _this.nav.push(SettingsPage);
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
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html'
        }),
        __metadata("design:paramtypes", [ActionSheetController,
            AlertController,
            LoadingController,
            Http,
            Storage, GlobalProvider,
            ModalController,
            MenuController, Platform, StatusBar, SplashScreen])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map