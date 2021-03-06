import { DataService } from "./../../app/services/data.service";
import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";

import { StatusBar } from "@ionic-native/status-bar";
// import { Storage } from "@ionic/storage";

// import { ImageViewPage } from "./../image-view/image-view";
import { NasaData } from "../../app/model/data.model";
import { FavDetailPage } from "./fav-detail/fav-detail";

@IonicPage()
@Component({
  selector: "page-favorites",
  templateUrl: "favorites.html"
})
export class FavoritesPage {
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

  ionViewDidLoad() {
    console.log("ionViewDidLoad FavoritesPage");
  }
  ionViewWillEnter() {
    this.statusBar.show();
    this.dataService.getData("favArray").then((dataArray: NasaData[]) => {
      this.data = dataArray;
    });
    this.localDirectory = this.dataService.getFileDirectory();
  }

  openFavDetail(item: NasaData) {
    this.navCtrl.push(FavDetailPage, {
      data: item,
      category: "favArray"
    });
  }
}
