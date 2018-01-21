import { NasaData } from "./../../app/model/data.model";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { Platform } from "ionic-angular";

import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";

@IonicPage()
@Component({
  selector: "page-image-view",
  templateUrl: "image-view.html",
  animations: [
    trigger("visibility", [
      state(
        "shown",
        style({
          opacity: "1"
        })
      ),
      state(
        "hidden",
        style({
          opacity: "0"
        })
      ),
      transition("shown <=> hidden", animate(".1s .7s"))
    ])
  ]
})
export class ImageViewPage {
  data: NasaData;
  imgUrl: string;
  hdurl: string;
  localUrl: string;
  loaded: boolean;
  isLandscape: boolean;
  type: string;
  todayDate: string;
  title: string;
  visibility: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private screenOrientation: ScreenOrientation,
    private platform: Platform
  ) {
    this.data = this.navParams.get("data");

    if (this.data) {
      this.hdurl = this.data.hdurl;
      this.localUrl = this.data.localUrl;
      this.todayDate = this.data.date;
      this.title = this.data.title;
      this.imgUrl = this.data.localUrl === "" ? this.hdurl : this.localUrl;
    }
    // this.hdurl =
    //   this.navParams.get("imageUrl") == null
    //     ? ""
    //     : this.navParams.get("imageUrl");

    // this.localUrl =
    //   this.navParams.get("localUrl") == null
    //     ? ""
    //     : this.navParams.get("localUrl");

    // this.todayDate =
    //   this.navParams.get("date") == null ? "" : this.navParams.get("date");

    // this.title =
    //   this.navParams.get("title") == null ? "" : this.navParams.get("title");

    // this.imgUrl = this.localUrl === "" ? this.hdurl : this.localUrl;

    this.loaded = false;
    this.isLandscape = false;
    this.type = "portrait";
    this.visibility = "shown";
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ImageViewPage");
    setTimeout(() => {
      this.visibility = "hidden";
    }, 2000);
    // allow user rotate
    this.platform.ready().then(() => {
      // this.screenOrientation.unlock();

      // detect orientation changes
      this.screenOrientation.onChange().subscribe(() => {
        console.log("Orientation Changed");

        this.isLandscape = this.isPortrait();
      });
    });
  }

  ionViewWillEnter() {
    this.isLandscape = this.isPortrait();
  }

  isPortrait(): boolean {
    if (
      this.screenOrientation.type === "landscape-primary" ||
      this.screenOrientation.type === "landscape-secondary"
    ) {
      this.visibility = "hidden";
      return true;
    } else {
      return false;
    }
  }

  tapEvent(e) {
    this.visibility = this.visibility === "shown" ? "hidden" : "shown";
  }

  dismiss() {
    this.navCtrl.pop();
  }
}
