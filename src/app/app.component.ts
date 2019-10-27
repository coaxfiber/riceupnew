import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicPage, ModalController,ModalOptions } from 'ionic-angular';
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
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Config,LoadingController, Loading } from 'ionic-angular';

import { AlertController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  loading: Loading;
  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  user

  image
  constructor(
    public actionSheetController: ActionSheetController,
   private alertCtrl: AlertController,
    private loadingCtrl:LoadingController,
   private http: Http,
   private storage:Storage,public global: GlobalProvider,
   private modal:ModalController,
   public menuCtrl: MenuController,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];
  }
alertConfirm() {
      let alert = this.alertCtrl.create({
        title: 'Confirm Logout',
        message: 'are you sure you want to Logout?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
            }
          },
          {
            text: 'Yes',
            handler: () => {
                this.storage.set('email',null)
                this.user=undefined;
                this.global.user=undefined;
                this.nav.setRoot(HomePage);
            }
          }
        ]
      });
      alert.present();
    }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.storage.get('email').then((val) => {
      console.log(val)
        if (val!=null&&val!='') {  
              var header = new Headers();
                header.append("Accept", "application/json");
                header.append("Content-Type", "application/x-www-form-urlencoded");    
                let option = new RequestOptions({ headers: header });
                var x =this.storage.get('email')
                let urlSearchParams = new URLSearchParams();
                   urlSearchParams.append('email', val);
                   urlSearchParams.append('pass', 'userinfo');
                let body = urlSearchParams.toString()

             this.http.post(this.global.api,body,option)
                  .map(response => response.json())
                  .subscribe(res => {
                    //console.log(res)
                      this.global.user = res.data
                      this.user = res.data
                      console.log(this.user)
                      //this.view.dismiss();
                      //this.presentAlert("Registration Complete!");
                  },error=>{
                      this.loading.dismissAll();
                    this.global.presentAlert("No Internet/Server Down!")
                  })
            }
    })

    
  }

  openPage(x) {
    this.menuCtrl.close();
    if (x==1) {
        this.nav.setRoot(ViewProfilePage);
    }
    if (x==2) {
        this.nav.setRoot(HomePage);
    }
    if (x==3) {
        this.nav.setRoot(MessagesPage);
    }
    if (x==4) {
        this.nav.setRoot(BasketPage);
    }
    if (x==5) {
      const mymodaloptions:ModalOptions = {
        enableBackdropDismiss:false
      }
      var none='none'
      const mymodal = this.modal.create(LogsPage,{data:none},mymodaloptions)
      mymodal.present()
    }
    if (x==6) {
      this.alertConfirm()
    }
    if (x==7) {
        this.nav.setRoot(FavoritesPage);
    }
    if (x==8) {
      this.presentActionSheet() 
    }
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
  }

   presentActionSheet() {
    const actionSheet = this.actionSheetController.create({
      title: 'Settings',
      buttons: [{
        text: 'Update User Information',
        icon: 'create',
        handler: () => {
          this.nav.push(ProfpicPage);
        }
      }, {
        text: 'Change Password',
        icon: 'build',
        handler: () => {
          this.nav.push(SettingsPage);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    actionSheet.present();
  }
}
