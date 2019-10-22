import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentsAddPage } from './payments-add';

@NgModule({
  declarations: [
    PaymentsAddPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentsAddPage),
  ],
})
export class PaymentsAddPageModule {}
