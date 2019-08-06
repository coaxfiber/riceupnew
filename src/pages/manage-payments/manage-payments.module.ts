import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagePaymentsPage } from './manage-payments';

@NgModule({
  declarations: [
    ManagePaymentsPage,
  ],
  imports: [
    IonicPageModule.forChild(ManagePaymentsPage),
  ],
})
export class ManagePaymentsPageModule {}
