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

import { Component } from "@angular/core";

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

import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";
import { PopoverPage } from "../popover/popover";

declare var cordova: any;

@IonicPage()
@Component({
  selector: "page-today",
  templateUrl: "today.html",
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
export class TodayPage {
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
    this.nasaData = new NasaData();
    this.platformName = this.platform.is("ios") === true ? "ios" : "android";
    this.savedImageUrl = "";
    this.visibility = "shown";
  }

  ionViewDidLoad() {
    this.storage.set("dataArray", []);
    // console.log("ionViewDidLoad TodayPage");
    this.statusBar.hide();
    this.dataService.getTodayData().subscribe(
      result => {
        this.nasaData = new NasaData({
          title: result.title,
          explanation: result.explanation,
          date: result.date,
          copyright: result.copyright,
          url: result.url,
          hdurl: result.hdurl,
          imageLoaded: false,
          isFav: false,
          isSaved: false,
          localUrl: ""
        });
        // this.download(result.url);
      },
      error => {
        console.log(error);
      }
    );
  }

  ionViewWillEnter() {
    // console.log("ionViewWillEnter TodayPage");
    this.platform.ready().then(() => {
      // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      // this.screenOrientation.lock(
      //   this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY
      // );
      // this.screenOrientation.lock(
      //   this.screenOrientation.ORIENTATIONS.PORTRAIT_SECONDARY
      // );
    });
  }

  openImageView() {
    let modal = this.modalCtrl.create(
      ImageViewPage,
      {
        data: this.nasaData
        imageUrl: this.nasaData.hdurl,
        date: this.nasaData.date,
        title: this.nasaData.title,
        localUrl: this.nasaData.localUrl;
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
      this.storage.get("dataArray").then((array: NasaData[]) => {
        if (array) {
          var index = array.findIndex(function(object) {
            return object.title === data.title;
          });
          if (index !== -1) {
            array.splice(index, 1);
          }
          this.storage.set("dataArray", array);
        } else {
          // var index = array.findIndex(function(object) {
          //   return object.title === data.title;
          // });
          if (index !== -1) {
            array.splice(index, 1);
          }
          this.storage.set("dataArray", array);
        }
        // console.log(array);
      });
    } else {
      this.storage.get("dataArray").then((array: NasaData[]) => {
        if (array) {
          data.isFav = true;
          data.localUrl = normalizeURL(this.savedImageUrl);
          console.log(data.localUrl);
          array.push(data);
          this.storage.set("dataArray", array);
        } else {
          // array: NasaData[] = [];
          data.isFav = true;
          data.localUrl = normalizeURL(this.savedImageUrl);
          array.push(data);
          this.storage.set("dataArray", array);
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

  // Copy the image to a local folder
  // private copyFileToLocalDir(namePath, currentName, newFileName) {
  //   // this.lastImage = namePath;
  //   this.file
  //     .copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName)
  //     .then(
  //       success => {
  //         this.lastImage = normalizeURL(
  //           cordova.file.dataDirectory + newFileName
  //         );
  //       },
  //       error => {
  //         this.presentToast("Error while storing file.");
  //       }
  //     );
  // }

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
