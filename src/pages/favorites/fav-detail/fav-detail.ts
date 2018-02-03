import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  Platform,
  ToastController,
  normalizeURL,
  PopoverController
} from "ionic-angular";

import { ImageViewPage } from "./../../image-view/image-view";
import { DataService } from "../../../app/services/data.service";
import { NasaData } from "../../../app/model/data.model";

import { Storage } from "@ionic/storage";
import { StatusBar } from "@ionic-native/status-bar";
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { SocialSharing } from "@ionic-native/social-sharing";
import { File } from "@ionic-native/file";
import { FilePath } from "@ionic-native/file-path";
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer";
import { PopoverPage } from "../../popover/popover";

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
  selector: "page-fav-detail",
  templateUrl: "fav-detail.html",
  animations: [
    trigger("visibility", [
      state(
        "shown",
        style({
          top: "-1px"
        })
      ),
      state(
        "hidden",
        style({
          top: "-70px"
        })
      ),
      transition("shown <=> hidden", animate(".2s .7s"))
    ])
  ]
})
export class FavDetailPage {
  nasaData: NasaData;
  platformName: string;
  savedImageUrl: string;
  visibility: string;
  localDirectory: string;
  category: string;

  constructor(
    private navCtrl: NavController,
    public navParams: NavParams,
    private dataService: DataService,
    private modalCtrl: ModalController,
    private screenOrientation: ScreenOrientation,
    private platform: Platform,
    private statusBar: StatusBar,
    private socialSharing: SocialSharing,
    private toastCtrl: ToastController,
    private file: File,
    private filePath: FilePath,
    private transfer: FileTransfer,
    private storage: Storage,
    private popoverCtrl: PopoverController
  ) {
    this.nasaData = this.navParams.get("data");
    this.category = this.navParams.get("category");
    this.platformName = this.platform.is("ios") === true ? "ios" : "android";
    this.savedImageUrl = "";
    this.visibility = "shown";
    this.localDirectory = this.dataService.getFileDirectory();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad FavDetailPage");
  }

  openImageView() {
    let modal = this.modalCtrl.create(
      ImageViewPage,
      {
        data: this.nasaData,
        category: this.category
      },
      {
        // enterAnimation: "modal-scale-up-enter",
        // leaveAnimation: "modal-scale-up-leave"
      }
    );
    modal.present();
  }

  shareImage() {
    this.socialSharing
      .share(
        "",
        "",
        this.dataService.getFileDirectory() + this.nasaData.fileName,
        ""
      )
      .then(() => {
        console.log("success");
      })
      .catch(() => {
        console.log("error");
      });
  }

  favoriteData(data: NasaData) {
    if (data.isFav) {
      // this.presentToast("Already saved!");
      data.isFav = false;
      this.storage.get("favArray").then((array: NasaData[]) => {
        if (array) {
          var index = array.findIndex(function(object) {
            return object.title === data.title;
          });
          if (index !== -1) {
            array.splice(index, 1);
          }
          this.storage.set("favArray", array);
        } else {
          // var index = array.findIndex(function(object) {
          //   return object.title === data.title;
          // });
          if (index !== -1) {
            array.splice(index, 1);
          }
          this.storage.set("favArray", array);
        }
        // console.log(array);
      });
    } else {
      this.storage.get("favArray").then((array: NasaData[]) => {
        data.isFav = true;
        data.localUrl = normalizeURL(this.savedImageUrl);
        array.push(data);
        this.storage.set("favArray", array);
      });
    }
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: "top"
    });
    toast.present();
  }

  tapEvent(e) {
    this.visibility === "shown" ? this.statusBar.hide() : this.statusBar.show();
    this.visibility = this.visibility === "shown" ? "hidden" : "shown";
  }
}
