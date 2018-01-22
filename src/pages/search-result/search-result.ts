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

import { ImageViewPage } from "./../image-view/image-view";
import { DataService } from "../../app/services/data.service";
import { NasaData } from "../../app/model/data.model";

import { Storage } from "@ionic/storage";
import { StatusBar } from "@ionic-native/status-bar";
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { SocialSharing } from "@ionic-native/social-sharing";
import { File } from "@ionic-native/file";
import { FilePath } from "@ionic-native/file-path";
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer";
import { PopoverPage } from "../popover/popover";

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
  selector: "page-search-result",
  templateUrl: "search-result.html",
  animations: [
    trigger("visibility", [
      state(
        "shown",
        style({
          top: "0px"
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
export class SearchResultPage {
  nasaData: NasaData;
  platformName: string;
  savedImageUrl: string;
  visibility: string;

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
    this.platformName = this.platform.is("ios") === true ? "ios" : "android";
    this.savedImageUrl = "";
    this.visibility = "shown";
  }

  ionViewDidLoad() {
    // this.storage.set("favArray", []);
    // console.log("ionViewDidLoad TodayPage");
    this.statusBar.hide();
  }

  openImageView() {
    let modal = this.modalCtrl.create(
      ImageViewPage,
      {
        data: this.nasaData
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
      .share("", "", this.savedImageUrl.replace("file://", ""), "")
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
        if (array) {
          data.isFav = true;
          data.localUrl = normalizeURL(this.savedImageUrl);
          console.log(data.localUrl);
          array.push(data);
          this.storage.set("favArray", array);
        } else {
          // array: NasaData[] = [];
          data.isFav = true;
          data.localUrl = normalizeURL(this.savedImageUrl);
          array.push(data);
          this.storage.set("favArray", array);
        }
        // console.log(array);
      });
    }
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
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
      .download(url, cordova.file.dataDirectory + this.nasaData.date + "jpg")
      .then(
        entry => {
          this.savedImageUrl = entry.toURL();
          // this.presentToast(this.savedImageUrl);
        },
        error => {
          // handle error
        }
      );
  }
}
