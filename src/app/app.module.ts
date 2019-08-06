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

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GlobalProvider } from '../providers/global/global';


@NgModule({
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
    ProductManagePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
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
    ProductManagePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalProvider
  ]
})
export class AppModule {}
