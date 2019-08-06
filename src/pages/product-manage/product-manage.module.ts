import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductManagePage } from './product-manage';

@NgModule({
  declarations: [
    ProductManagePage,
  ],
  imports: [
    IonicPageModule.forChild(ProductManagePage),
  ],
})
export class ProductManagePageModule {}
