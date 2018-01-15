import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { Platform } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-image-view",
  templateUrl: "image-view.html"
})
export class ImageViewPage {
  hdurl: string;
  loaded: boolean;
  isLandscape: boolean;
  type: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private screenOrientation: ScreenOrientation,
    private platform: Platform
  ) {
    this.hdurl =
      this.navParams.get("imageUrl") == null
        ? ""
        : this.navParams.get("imageUrl");

    this.loaded = false;
    this.isLandscape = false;
    this.type = "portrait";
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ImageViewPage");
    // allow user rotate
    this.platform.ready().then(() => {
      this.screenOrientation.unlock();

      // detect orientation changes
      this.screenOrientation.onChange().subscribe(() => {
        console.log("Orientation Changed");
        if (
          this.screenOrientation.type === "landscape-primary" ||
          this.screenOrientation.type === "landscape-secondary"
        ) {
          this.isLandscape = true;
          // this.type = this.screenOrientation.type;
        } else {
          this.isLandscape = false;
          // this.type = this.screenOrientation.type;
        }
      });
    });
  }

  dismiss() {
    this.navCtrl.pop();
  }
}
