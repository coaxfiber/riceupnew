import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BasketAddToPage } from './basket-add-to';

@NgModule({
  declarations: [
    BasketAddToPage,
  ],
  imports: [
    IonicPageModule.forChild(BasketAddToPage),
  ],
})
export class BasketAddToPageModule {}
