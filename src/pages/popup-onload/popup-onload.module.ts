import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopupOnloadPage } from './popup-onload';

@NgModule({
  declarations: [
    PopupOnloadPage,
  ],
  imports: [
    IonicPageModule.forChild(PopupOnloadPage),
  ],
})
export class PopupOnloadPageModule {}
