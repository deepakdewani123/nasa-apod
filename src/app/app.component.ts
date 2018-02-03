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
@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private storage: Storage,
    modalCtrl: ModalController,
    public config: Config
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleLightContent();
      // splashScreen.hide();
      this.setCustomTransitions();
      let splash = modalCtrl.create(
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

      this.storage.get("dataExists").then(data => {
        if (data) {
          console.log("data exists");
        } else {
          this.storage.set("dataExists", true);
          this.storage.set("favArray", []);
          this.storage.set("recentsArray", []);
          this.storage.set("todayData", {});
        }
      });
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
