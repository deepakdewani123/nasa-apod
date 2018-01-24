import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecentDetailsPage } from './recent-details';

@NgModule({
  declarations: [
    RecentDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(RecentDetailsPage),
  ],
})
export class RecentDetailsPageModule {}
