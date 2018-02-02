import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { TabsPage } from "../pages/tabs/tabs";
import { Storage } from "@ionic/storage";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import {
  FlurryAnalytics,
  FlurryAnalyticsObject,
  FlurryAnalyticsOptions
} from "@ionic-native/flurry-analytics";

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
    private flurryAnalytics: FlurryAnalytics
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleLightContent();
      splashScreen.hide();

      const options: FlurryAnalyticsOptions = {
        appKey: "48CQ33PYBY5N8HDKK8ZN", // REQUIRED
        reportSessionsOnClose: true,
        enableLogging: true
      };

      let fa: FlurryAnalyticsObject = this.flurryAnalytics.create(options);

      fa
        .logEvent("create")
        .then(() => console.log("Logged an event!"))
        .catch(e => console.log("Error logging the event", e));

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
}
