import {
  IonicPage,
  NavParams,
  ModalController,
  Platform,
  normalizeURL,
  PopoverController
} from "ionic-angular";

import * as moment from "moment";

import { Component } from "@angular/core";

import { ImageViewPage } from "./../image-view/image-view";
import { DataService } from "../../app/services/data.service";
import { NasaData } from "../../app/model/data.model";

import { SearchResultPage } from "./../search-result/search-result";
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
export class TodayPage {
  nasaData: NasaData;
  searchData: NasaData;
  platformName: string;
  savedImageUrl: string;
  visibility: string;
  date: string;
  imgUrl: string;
  imageShareUrl: string;

  constructor(
    public navParams: NavParams,
    private dataService: DataService,
    private modalCtrl: ModalController,
    private screenOrientation: ScreenOrientation,
    private platform: Platform,
    private statusBar: StatusBar,
    private socialSharing: SocialSharing,
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
    this.imageShareUrl = "";
  }

  ionViewDidLoad() {
    this.setupUI();
  }

  ionViewWillEnter() {
    this.setupScreenOrientation();
  }

  setupUI() {
    // this.storage.set("todayData", new NasaData());
    this.loadData();
  }

  loadData() {
    const todayDate = moment().format("YYYY-MM-DD");
    const currentHour = moment();
    const startTime = moment().hour(11);

    this.storage.get("todayData").then((data: NasaData) => {
      if (!data.isImageDownloaded) {
        this.getTodayData();
      } else {
        if (currentHour.isAfter(startTime) && data.date !== todayDate) {
          this.getTodayData();
        } else {
          this.nasaData = data;
          this.imgUrl =
            this.dataService.getFileDirectory() + this.nasaData.fileName;
        }
      }
    });
  }

  setupScreenOrientation() {
    this.platform.ready().then(() => {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
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
            this.getSearchData(self.date);
          } else {
            this.navigateToSearchPage(recArray[index]);
          }
        });
      } else {
        this.navigateToSearchPage(favArray[index]);
      }
    });
  }

  getTodayData() {
    this.dataService.getTodayData().subscribe(
      result => {
        this.nasaData = new NasaData({
          title: result.title,
          explanation: result.explanation,
          date: result.date,
          fileName: this.createFileName(result.date),
          hdFileName: this.createFileName(result.date),
          copyright: result.copyright,
          url: result.url,
          localHDUrl: "",
          hdurl: result.hdurl,
          imageLoaded: false,
          isSaved: false,
          hdImageLoaded: false,
          isFav: false,
          localUrl: ""
        });
        this.download(result.url, this.nasaData.fileName);
      },
      error => {
        console.log(error);
      }
    );
  }

  getSearchData(date: string) {
    this.dataService.getDataForDate(date).subscribe(
      result => {
        this.searchData = new NasaData({
          title: result.title,
          explanation: result.explanation,
          date: result.date,
          fileName: this.createFileName(result.date),
          hdFileName: this.createFileName(result.date),
          copyright: result.copyright,
          url: result.url,
          localHDUrl: "",
          hdurl: result.hdurl,
          imageLoaded: false,
          isSaved: false,
          hdImageLoaded: false,
          isFav: false,
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
        data: this.nasaData,
        category: "today"
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
      data.isFav = false;
      this.storage.get("favArray").then((array: NasaData[]) => {
        var index = array.findIndex(function(object) {
          return object.title === data.title;
        });
        if (index !== -1) {
          array.splice(index, 1);
        }
        this.storage.set("todayData", data);
        this.storage.set("favArray", array);
      });
    } else {
      this.storage.get("favArray").then((array: NasaData[]) => {
        data.isFav = true;
        // data.localUrl = normalizeURL(this.savedImageUrl);
        array.push(data);
        this.storage.set("todayData", data);
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
    this.visibility === "shown" ? this.statusBar.hide() : this.statusBar.show();
    this.visibility = this.visibility === "shown" ? "hidden" : "shown";

    if (this.visibility === "shown") {
      setTimeout(() => {
        this.visibility = "hidden";
        this.statusBar.hide();
      }, 7000);
    }
  }

  private createFileName(date: string) {
    let newFileName = date + ".jpg";
    return newFileName;
  }

  private download(url: string, fileName: string) {
    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.download(url, cordova.file.dataDirectory + fileName).then(
      entry => {
        this.nasaData.localUrl =
          normalizeURL(cordova.file.dataDirectory) + fileName; // image URL to load local image

        this.nasaData.fileName = fileName;

        this.imageShareUrl =
          cordova.file.dataDirectory + this.nasaData.fileName; // image URL to share to social media

        this.nasaData.imageLoaded = true;
        this.nasaData.isImageDownloaded = true;
        this.imgUrl = normalizeURL(entry.toURL());

        this.storage.set("todayData", this.nasaData);
      },
      error => {
        // handle error
        this.dataService.presentToast(
          "The image couldn't be downloaded. Please try again."
        );
      }
    );
  }
}
