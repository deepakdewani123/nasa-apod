import { SearchResultPage } from "./../search-result/search-result";
import { NasaData } from "./../../app/model/data.model";
import { Component, ViewChild, ElementRef } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  ModalController,
  normalizeURL
} from "ionic-angular";

import { DataService } from "../../app/services/data.service";
import { ImageViewPage } from "./../image-view/image-view";
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
  selector: "page-popover",
  templateUrl: "popover.html"
})
export class PopoverPage {
  @ViewChild("yearFirst") yearFirst;
  @ViewChild("yearSecond") yearSecond;
  @ViewChild("yearThird") yearThird;
  @ViewChild("yearFourth") yearFourth;

  @ViewChild("monthFirst") monthFirst;
  @ViewChild("monthSecond") monthSecond;

  @ViewChild("dateFirst") dateFirst;
  @ViewChild("dateSecond") dateSecond;

  nasaData: NasaData;
  data: NasaData;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private dataService: DataService,
    private modalCtrl: ModalController,
    private storage: Storage
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad PopoverPage");
    // setTimeout(() => {
    //   this.dateSecond.setFocus();
    // }, 500);
  }

  // ionViewWillEnter() {
  //   this.viewCtrl.dismiss();
  // }

  close() {
    this.viewCtrl.dismiss();
  }

  yearFocusNext() {
    if (this.yearFirst.value !== "") {
      this.yearSecond.setFocus();
      if (this.yearSecond.value !== "") {
        this.yearThird.setFocus();
        if (this.yearThird.value !== "") {
          this.yearFourth.setFocus();
          if (this.yearFourth.value !== "") {
            this.monthFirst.setFocus();
          }
        }
      }
    }
  }

  monthFocusNext() {
    if (this.monthFirst.value !== "") {
      this.monthSecond.setFocus();
      if (this.monthSecond.value !== "") {
        this.dateFirst.setFocus();
      }
    }
  }

  dateFocusNext() {
    if (this.dateFirst.value !== "") {
      this.dateSecond.setFocus();
    }
  }

  search() {
    const date = `${this.yearFirst.value}${this.yearSecond.value}${
      this.yearThird.value
    }${this.yearFourth.value}-${this.monthFirst.value}${
      this.monthSecond.value
    }-${this.dateFirst.value}${this.dateSecond.value}`;

    this.storage.get("favArray").then((favArray: NasaData[]) => {
      let index = favArray.findIndex(function(object) {
        return object.date === date;
      });

      if (index === -1) {
        this.storage.get("recentsArray").then((recArray: NasaData[]) => {
          index = recArray.findIndex(function(object) {
            return object.date === date;
          });
          if (index === -1) {
            this.getDataFromServer(date);
          } else {
            this.navigateToSearchPage(recArray[index]);
          }
        });
      } else {
        this.navigateToSearchPage(favArray[index]);
      }
    });
  }

  checkIfAlreadyExists(date: string): boolean {
    if (this.checkForFavArray(date) !== -1) {
      return true;
    }
    if (this.checkForRecentsArray(date) !== -1) {
      return true;
    } else {
      return false;
    }
  }

  checkForFavArray(date: string): number {
    let index = 0;
    this.storage.get("favArray").then((array: NasaData[]) => {
      index = array.findIndex(function(object) {
        return object.date === date;
      });
      if (index !== -1) {
        this.data = array[index];
      }
    });

    return index;
  }

  checkForRecentsArray(date: string): number {
    let index = 0;
    this.storage.get("recentsArray").then((array: NasaData[]) => {
      index = array.findIndex(function(object) {
        return object.date === date;
      });
      if (index !== -1) {
        this.data = array[index];
        console.log(array[index]);
      }
    });
    return index;
  }

  getDataFromServer(date: string) {
    this.dataService.getDataForDate(date).subscribe(
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
        this.navigateToSearchPage(this.nasaData);
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

  deleteInput() {}
}
