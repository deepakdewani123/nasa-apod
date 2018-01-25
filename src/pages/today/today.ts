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

import { SearchResultPage } from "./../search-result/search-result";
import { DatePicker } from "@ionic-native/date-picker";
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
  searchData: NasaData;
  platformName: string;
  savedImageUrl: string;
  visibility: string;
  date: string;
  imgUrl: string;

  constructor(
    private navCtrl: NavController,
    public navParams: NavParams,
    private dataService: DataService,
    private modalCtrl: ModalController,
    private screenOrientation: ScreenOrientation,
    private platform: Platform,
    private statusBar: StatusBar,
    private datePicker: DatePicker,
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
    this.date = "";
    this.imgUrl = "";
  }

  ionViewDidLoad() {
    // this.storage.set("favArray", []);
    // console.log("ionViewDidLoad TodayPage");
    // this.statusBar.hide();
    this.dataService.getTodayData().subscribe(
      result => {
        this.nasaData = new NasaData({
          title: result.title,
          explanation: result.explanation,
          date: result.date,
          copyright: result.copyright,
          url: result.url,
          localHDUrl: "",
          hdurl: result.hdurl,
          imageLoaded: false,
          isFav: false,
          isSaved: false,
          localUrl: ""
        });
        this.download(result.url);
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

  search() {
    var self = this;
    this.storage.get("favArray").then((favArray: NasaData[]) => {
      let index = favArray.findIndex(function(object) {
        return object.date === self.date;
      });

      if (index === -1) {
        this.storage.get("recentsArray").then((recArray: NasaData[]) => {
          index = recArray.findIndex(function(object) {
            return object.date === self.date;
          });
          if (index === -1) {
            this.getDataFromServer(self.date);
          } else {
            this.navigateToSearchPage(recArray[index]);
          }
        });
      } else {
        this.navigateToSearchPage(favArray[index]);
      }
    });
  }

  getDataFromServer(date: string) {
    this.dataService.getDataForDate(date).subscribe(
      result => {
        this.searchData = new NasaData({
          title: result.title,
          explanation: result.explanation,
          date: result.date,
          copyright: result.copyright,
          url: result.url,
          localHDUrl: "",
          hdurl: result.hdurl,
          imageLoaded: false,
          isFav: false,
          isSaved: false,
          localUrl: ""
        });
        this.navigateToSearchPage(this.searchData);
      },
      error => {
        console.log(error);
      }
    );
  }

  navigateToSearchPage(data: NasaData) {
    let modal = this.modalCtrl.create(
      SearchResultPage,
      {
        data: data
      },
      {
        // enterAnimation: "modal-scale-up-enter",
        // leaveAnimation: "modal-scale-up-leave"
      }
    );
    modal.present();
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
      data.isFav = false;
      this.storage.get("favArray").then((array: NasaData[]) => {
        var index = array.findIndex(function(object) {
          return object.title === data.title;
        });
        if (index !== -1) {
          array.splice(index, 1);
        }
        this.storage.set("favArray", array);
      });
    } else {
      this.storage.get("favArray").then((array: NasaData[]) => {
        data.isFav = true;
        // data.localUrl = normalizeURL(this.savedImageUrl);
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

  tapEvent(e) {
    // this.statusBar.hide();
    this.visibility === "shown" ? this.statusBar.hide() : this.statusBar.show();
    this.visibility = this.visibility === "shown" ? "hidden" : "shown";
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
          this.nasaData.localUrl = normalizeURL(entry.toURL());
          this.nasaData.imageLoaded = true;
          this.imgUrl =
            this.nasaData.localUrl === ""
              ? this.nasaData.url
              : this.nasaData.localUrl;
          this.presentToast(this.nasaData.localUrl);
        },
        error => {
          // handle error
        }
      );
  }
}
