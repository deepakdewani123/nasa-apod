import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { NasaData } from "../../app/model/data.model";
import { Storage } from "@ionic/storage";

/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-favorites",
  templateUrl: "favorites.html"
})
export class FavoritesPage {
  data: NasaData[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage
  ) {
    this.data = [];
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad FavoritesPage");
  }
  ionViewWillEnter() {
    this.storage.get("dataArray").then((dataArray: NasaData[]) => {
      if (dataArray) {
        this.data = dataArray;
      } else {
      }

      console.log(this.data);
    });
  }
}
