import { Component } from "@angular/core";
import { Platform, ModalController } from "ionic-angular";
import { TabsPage } from "../pages/tabs/tabs";
import { Storage } from "@ionic/storage";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { SplashPage } from "../pages/splash/splash";
import { Config } from "ionic-angular";

import { ModalScaleUpLeaveTransition } from "../transitions/scale-up-leave.transition";
import { ModalScaleUpEnterTransition } from "../transitions/scale-up-enter.transition";
import { NasaData } from "./model/data.model";
@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private storage: Storage,
    private modalCtrl: ModalController,
    public config: Config
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      console.log("before setup data");
      this.setupData();
      console.log("after setup data");
      statusBar.styleLightContent();
      // splashScreen.hide();
      this.setCustomTransitions();

      // to be used later
      // const options: FlurryAnalyticsOptions = {
      //   appKey: "48CQ33PYBY5N8HDKK8ZN", // REQUIRED
      //   reportSessionsOnClose: true,
      //   enableLogging: true
      // };

      // let fa: FlurryAnalyticsObject = this.flurryAnalytics.create(options);

      // fa
      //   .logEvent("create")
      //   .then(() => console.log("Logged an event!"))
      //   .catch(e => console.log("Error logging the event", e));

      // this.presentSplash();
    });
  }

  private presentSplash() {
    let splash = this.modalCtrl.create(
      SplashPage,
      {},
      {
        showBackdrop: false,
        enableBackdropDismiss: false,
        enterAnimation: "modal-scale-up-enter",
        leaveAnimation: "modal-scale-up-leave"
      }
    );
    splash.present();
  }

  private setupData() {
    this.storage.get("dataExists").then(data => {
      if (data) {
        console.log("data exists");
        this.presentSplash();
        this.rootPage = TabsPage;
      } else {
        console.log("data doesnt exists");
        this.presentSplash();
        this.rootPage = TabsPage;
        this.storage.set("dataExists", true);
        this.storage.set("favArray", new Array<NasaData>());
        this.storage.set("recentsArray", new Array<NasaData>());
        this.storage.set("todayData", new NasaData());
      }
    });
  }
  private setCustomTransitions() {
    this.config.setTransition(
      "modal-scale-up-leave",
      ModalScaleUpLeaveTransition
    );
    this.config.setTransition(
      "modal-scale-up-enter",
      ModalScaleUpEnterTransition
    );
  }
}
