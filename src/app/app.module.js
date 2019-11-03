var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { PopupOnloadPage } from '../pages/popup-onload/popup-onload';
import { ViewProfilePage } from '../pages/view-profile/view-profile';
import { MessagesPage } from '../pages/messages/messages';
import { MessagesUserPage } from '../pages/messages-user/messages-user';
import { BasketPage } from '../pages/basket/basket';
import { ProductAddPage } from '../pages/product-add/product-add';
import { ManagePaymentsPage } from '../pages/manage-payments/manage-payments';
import { ProductManagePage } from '../pages/product-manage/product-manage';
import { PaymentsAddPage } from '../pages/payments-add/payments-add';
import { ModalSalamatPage } from '../pages/modal-salamat/modal-salamat';
import { ProductViewPage } from '../pages/product-view/product-view';
import { ViewProfileFarmerPage } from '../pages/view-profile-farmer/view-profile-farmer';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { LogsPage } from '../pages/logs/logs';
import { FavoritesPage } from '../pages/favorites/favorites';
import { ProfpicPage } from '../pages/profpic/profpic';
import { SettingsPage } from '../pages/settings/settings';
import { LocatePage } from '../pages/locate/locate';
import { BasketAddToPage } from '../pages/basket-add-to/basket-add-to';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GlobalProvider } from '../providers/global/global';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { Camera } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                MyApp,
                HomePage,
                ListPage,
                PopupOnloadPage,
                ViewProfilePage,
                MessagesPage,
                MessagesUserPage,
                BasketPage,
                ProductAddPage,
                ManagePaymentsPage,
                ProductManagePage,
                PaymentsAddPage,
                ModalSalamatPage,
                ProductViewPage,
                ViewProfileFarmerPage,
                LoginPage,
                RegisterPage,
                LogsPage,
                FavoritesPage,
                ProfpicPage,
                SettingsPage,
                LocatePage,
                BasketAddToPage
            ],
            imports: [
                BrowserModule,
                IonicModule.forRoot(MyApp),
                IonicStorageModule.forRoot(),
                HttpModule
            ],
            bootstrap: [IonicApp],
            entryComponents: [
                MyApp,
                HomePage,
                ListPage,
                PopupOnloadPage,
                ViewProfilePage,
                MessagesPage,
                MessagesUserPage,
                BasketPage,
                ProductAddPage,
                ManagePaymentsPage,
                ProductManagePage,
                PaymentsAddPage,
                ModalSalamatPage,
                ProductViewPage,
                ViewProfileFarmerPage,
                LoginPage,
                RegisterPage,
                LogsPage,
                FavoritesPage,
                ProfpicPage,
                SettingsPage,
                LocatePage,
                BasketAddToPage
            ],
            providers: [
                Camera, FileTransfer,
                Geolocation,
                NativeGeocoder,
                StatusBar,
                SplashScreen,
                { provide: ErrorHandler, useClass: IonicErrorHandler },
                GlobalProvider
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map