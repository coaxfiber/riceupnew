import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
constructor() { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }
}
