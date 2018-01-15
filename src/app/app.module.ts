import { ImageViewPageModule } from "./../pages/image-view/image-view.module";
import { ImageViewPage } from "./../pages/image-view/image-view";
import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { HttpClientModule } from "@angular/common/http";
import { MyApp } from "./app.component";
import { ScreenOrientation } from "@ionic-native/screen-orientation";

import { TabsPage } from "../pages/tabs/tabs";
import { SettingsPage } from "../pages/settings/settings";
import { TodayPage } from "../pages/today/today";
import { DataService } from "../app/services/data.service";
@NgModule({
  declarations: [MyApp, TabsPage, TodayPage, SettingsPage],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    ImageViewPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, TabsPage, TodayPage, SettingsPage, ImageViewPage],
  providers: [
    StatusBar,
    SplashScreen,
    DataService,
    ScreenOrientation,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
