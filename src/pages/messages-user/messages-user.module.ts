import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessagesUserPage } from './messages-user';

@NgModule({
  declarations: [
    MessagesUserPage,
  ],
  imports: [
    IonicPageModule.forChild(MessagesUserPage),
  ],
})
export class MessagesUserPageModule {}
