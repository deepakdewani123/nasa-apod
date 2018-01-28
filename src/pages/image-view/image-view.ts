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
  // todayDate: string;
  // title: string;
  visibility: string;
  localDirectory: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private screenOrientation: ScreenOrientation,
    private platform: Platform,
    private file: File,
    private transfer: FileTransfer,
    private toastCtrl: ToastController,
    private dataService: DataService
  ) {
    this.data = this.navParams.get("data");

    this.localDirectory = "";
    // this.todayDate = this.data.date;
    // this.title = this.data.title;
    this.imgUrl = "";
    this.isLoading = true;
    this.isLandscape = false;
    this.orientation = "portrait";
    this.visibility = "shown";
  }

  ionViewDidLoad() {
    this.category = this.navParams.get("category");
    setTimeout(() => {
      this.visibility = "hidden";
    }, 5000);
    // console.log(this.data.hdFileName);
    this.file
      .checkFile(cordova.file.dataDirectory + "hdImages/", this.data.hdFileName)
      .then(_ => {
        this.presentToast("file exists");
        this.isLoading = false;
        this.imgUrl =
          this.dataService.getFileDirectory() +
          "hdImages/" +
          this.data.hdFileName;
      })
      .catch(err => {
        this.presentToast("file doesnt exist");
        this.download(this.data.hdurl, this.createFileName(this.data.date));
      });

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

  private createFileName(date: string) {
    let newFileName = date + ".jpg";
    return newFileName;
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
          this.data.hdFileName = fileName;
          this.isLoading = false;
          this.imgUrl = normalizeURL(entry.toURL());
          this.dataService.updateData(self.category, this.data.date, fileName);
        },
        error => {
          // handle error
        }
      );
  }
}
