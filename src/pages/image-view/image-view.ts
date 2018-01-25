import { NasaData } from "./../../app/model/data.model";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  normalizeURL,
  ToastController
} from "ionic-angular";
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { Platform } from "ionic-angular";
import { File } from "@ionic-native/file";
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer";

import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";

declare var cordova: any;

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
  // hdurl: string;
  // localUrl: string;
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
    private platform: Platform,
    private file: File,
    private transfer: FileTransfer,
    private toastCtrl: ToastController
  ) {
    this.data = this.navParams.get("data");

    if (this.data) {
      this.todayDate = this.data.date;
      this.title = this.data.title;
      this.imgUrl =
        this.data.localHDUrl === "" ? this.data.hdurl : this.data.localHDUrl;
    }

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

    if (this.data.localHDUrl === "") {
      this.download(this.data.hdurl);
      this.presentToast("not download");
    } else {
      this.presentToast("download");
      this.loaded = true;
      this.imgUrl = this.data.localHDUrl;
    }
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

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: "top"
    });
    toast.present();
  }

  private download(url: string) {
    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer
      .download(url, cordova.file.dataDirectory + this.todayDate + "jpg")
      .then(
        entry => {
          // this.savedImageUrl = entry.toURL();
          this.data.localHDUrl = normalizeURL(entry.toURL());
          // this.data.imageLoaded = true;
          this.loaded = true;
          this.imgUrl =
            this.data.localHDUrl === ""
              ? this.data.hdurl
              : this.data.localHDUrl;
        },
        error => {
          // handle error
        }
      );
  }
}
