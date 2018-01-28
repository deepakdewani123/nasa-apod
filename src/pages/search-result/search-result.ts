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
export class SearchResultPage {
  nasaData: NasaData;
  platformName: string;
  savedImageUrl: string;
  visibility: string;
  imgUrl: string;
  imageShareUrl: string;
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
    this.platformName = this.platform.is("ios") === true ? "ios" : "android";
    this.savedImageUrl = "";
    this.visibility = "shown";
    this.imgUrl = "";
    this.imageShareUrl = "";
  }

  ionViewDidLoad() {
    // this.storage.set("favArray", []);
    this.statusBar.hide();

    if (!this.nasaData.isSaved) {
      this.download(this.nasaData.url, this.createFileName(this.nasaData.date));
      this.presentToast("not saved");
    } else {
      this.imgUrl = this.nasaData.url;
      this.presentToast("saved");
    }
  }

  ionViewWillEnter() {}

  openImageView() {
    let modal = this.modalCtrl.create(
      ImageViewPage,
      {
        data: this.nasaData,
        category: "recentsArray"
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
      .share("", "", this.imageShareUrl.replace("file://", ""), "")
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

  // presentPopover(myEvent) {
  //   let popover = this.popoverCtrl.create(PopoverPage);
  //   popover.present({
  //     ev: myEvent
  //   });
  // }

  tapEvent(e) {
    this.visibility = this.visibility === "shown" ? "hidden" : "shown";
  }

  dismiss() {
    this.navCtrl.pop();
  }

  private saveData(data: NasaData) {
    if (!data.isSaved) {
      this.storage.get("recentsArray").then((array: NasaData[]) => {
        data.isSaved = true;
        array.push(data);
        this.storage.set("recentsArray", array);
      });
    }
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
    this.nasaData.fileName = newFileName;
    return newFileName;
  }

  private download(url: string, fileName: string) {
    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.download(url, cordova.file.dataDirectory + fileName).then(
      entry => {
        this.imageShareUrl = entry.toURL();
        this.savedImageUrl = entry.toURL();
        this.nasaData.imageLoaded = true;
        this.imgUrl = normalizeURL(entry.toURL());
        this.saveData(this.nasaData);
      },
      error => {
        // handle error
      }
    );
  }
}
