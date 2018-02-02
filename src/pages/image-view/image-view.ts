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
import { DataService } from "../../app/services/data.service";
import { StatusBar } from "@ionic-native/status-bar";

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
  isLoading: boolean;
  isLandscape: boolean;
  orientation: string;
  category: string;
  visibility: string;
  localDirectory: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private screenOrientation: ScreenOrientation,
    private platform: Platform,
    private statusBar: StatusBar,
    private file: File,
    private transfer: FileTransfer,
    private toastCtrl: ToastController,
    private dataService: DataService
  ) {
    this.data = this.navParams.get("data");
    this.category = this.navParams.get("category");
    this.localDirectory = "";
    this.imgUrl = "";
    this.isLoading = true;
    this.isLandscape = false;
    this.orientation = "portrait";
    this.visibility = "shown";
  }

  ionViewDidLoad() {
    this.setupUI();
  }

  ionViewWillEnter() {
    this.isLandscape = this.isPortrait();
  }

  setupUI() {
    this.statusBar.hide();
    setTimeout(() => {
      this.visibility = "hidden";
    }, 5000);

    this.loadImage();
    this.setupScreenOrientation();
  }

  loadImage() {
    this.file
      .checkFile(cordova.file.dataDirectory + "hdImages/", this.data.hdFileName)
      .then(_ => {
        this.isLoading = false;
        this.imgUrl =
          this.dataService.getFileDirectory() +
          "hdImages/" +
          this.data.hdFileName;
      })
      .catch(err => {
        this.download(this.data.hdurl, this.data.hdFileName);
      });
  }

  setupScreenOrientation() {
    // allow user rotate
    this.platform.ready().then(() => {
      this.screenOrientation.unlock();

      // detect orientation changes
      this.screenOrientation.onChange().subscribe(() => {
        console.log("Orientation Changed");

        this.isLandscape = this.isPortrait();
      });
    });
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
    this.statusBar.show();
  }

  private download(url: string, fileName: string) {
    const self = this;
    const fileTransfer: FileTransferObject = this.transfer.create();

    // switch (category) {
    //   case "favorites":
    //   case "recents":
    //   case "today":
    //   default:
    //     console.log("nothing");
    // }

    fileTransfer
      .download(url, cordova.file.dataDirectory + "hdImages/" + fileName)
      .then(
        entry => {
          this.isLoading = false;
          this.imgUrl = normalizeURL(entry.toURL());
        },
        error => {
          // handle error
        }
      );
  }
}
