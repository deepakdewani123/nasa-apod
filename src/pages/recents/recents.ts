import { RecentDetailsPage } from "./recent-details/recent-details";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController
} from "ionic-angular";

import { NasaData } from "../../app/model/data.model";
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
  selector: "page-recents",
  templateUrl: "recents.html"
})
export class RecentsPage {
  data: NasaData[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private modalCtrl: ModalController
  ) {
    this.data = [];
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad RecentsPage");
  }

  ionViewWillEnter() {
    this.storage.get("recentsArray").then((dataArray: NasaData[]) => {
      if (dataArray) {
        this.data = dataArray.sort().reverse();
      }
    });
  }

  openRecentsDetail(item: NasaData) {
    this.navCtrl.push(RecentDetailsPage, {
      data: item
    });
  }
}
