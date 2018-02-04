import { StatusBar } from "@ionic-native/status-bar";
import { DataService } from "./../../app/services/data.service";
import { RecentDetailsPage } from "./recent-details/recent-details";
import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";

import { NasaData } from "../../app/model/data.model";

@IonicPage()
@Component({
  selector: "page-recents",
  templateUrl: "recents.html"
})
export class RecentsPage {
  data: NasaData[];
  localDirectory: string;
  constructor(
    public navCtrl: NavController,
    private dataService: DataService,
    private statusBar: StatusBar
  ) {
    this.data = [];
    this.localDirectory = "";
  }

  ionViewDidLoad() {}

  ionViewWillEnter() {
    this.statusBar.show();
    this.dataService.getData("recentsArray").then((dataArray: NasaData[]) => {
      this.data = dataArray.sort().reverse();
    });

    this.localDirectory = this.dataService.getFileDirectory();
  }

  openRecentsDetail(item: NasaData) {
    this.navCtrl.push(RecentDetailsPage, {
      data: item,
      category: "recentsArray"
    });
  }
}
