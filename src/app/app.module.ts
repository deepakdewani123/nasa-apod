import { RecentsPage } from "./../pages/recents/recents";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { HttpClientModule } from "@angular/common/http";

import { MyApp } from "./app.component";
import { ImageViewPageModule } from "./../pages/image-view/image-view.module";
import { ImageViewPage } from "./../pages/image-view/image-view";
import { TabsPage } from "../pages/tabs/tabs";
import { SettingsPage } from "../pages/settings/settings";
import { FavoritesPage } from "./../pages/favorites/favorites";
import { TodayPage } from "../pages/today/today";
import { DataService } from "../app/services/data.service";

import { IonicStorageModule } from "@ionic/storage";
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { SocialSharing } from "@ionic-native/social-sharing";
import { File } from "@ionic-native/file";
import { FilePath } from "@ionic-native/file-path";
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { PopoverPage } from "../pages/popover/popover";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    TodayPage,
    RecentsPage,
    FavoritesPage,
    SettingsPage,
    PopoverPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ImageViewPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    TodayPage,
    RecentsPage,
    FavoritesPage,
    SettingsPage,
    ImageViewPage,
    PopoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DataService,
    ScreenOrientation,
    SocialSharing,
    FileTransfer,
    FilePath,
    File,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
