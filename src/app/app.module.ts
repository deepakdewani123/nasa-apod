import { ErrorHandler, NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { IonicStorageModule } from "@ionic/storage";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { SearchResultPage } from "./../pages/search-result/search-result";
import { RecentsPage } from "./../pages/recents/recents";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { MyApp } from "./app.component";
import { ImageViewPageModule } from "./../pages/image-view/image-view.module";
import { ImageViewPage } from "./../pages/image-view/image-view";
import { TabsPage } from "../pages/tabs/tabs";
import { SettingsPage } from "../pages/settings/settings";
import { FavoritesPage } from "./../pages/favorites/favorites";
import { TodayPage } from "../pages/today/today";
import { DataService } from "../app/services/data.service";
import { PopoverPage } from "../pages/popover/popover";
import { FavDetailPage } from "../pages/favorites/fav-detail/fav-detail";
import { RecentDetailsPage } from "../pages/recents/recent-details/recent-details";

import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { SocialSharing } from "@ionic-native/social-sharing";
import { File } from "@ionic-native/file";
import { FilePath } from "@ionic-native/file-path";
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { DatePicker } from "@ionic-native/date-picker";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    TodayPage,
    RecentsPage,
    RecentDetailsPage,
    FavoritesPage,
    SettingsPage,
    PopoverPage,
    SearchResultPage,
    FavDetailPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: ""
    }),
    IonicStorageModule.forRoot(),
    ImageViewPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    TodayPage,
    RecentsPage,
    RecentDetailsPage,
    FavoritesPage,
    SettingsPage,
    ImageViewPage,
    PopoverPage,
    SearchResultPage,
    FavDetailPage
  ],
  providers: [
    DatePicker,
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
