import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { HttpClientModule } from "@angular/common/http";
import { MyApp } from "./app.component";

import { TabsPage } from "../pages/tabs/tabs";
import { SettingsPage } from "../pages/settings/settings";
import { TodayPage } from "../pages/today/today";
import { DataService } from "../app/services/data.service";
@NgModule({
  declarations: [MyApp, TabsPage, TodayPage, SettingsPage],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, TabsPage, TodayPage, SettingsPage],
  providers: [
    StatusBar,
    SplashScreen,
    DataService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
