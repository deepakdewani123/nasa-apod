import { DataService } from "./../../app/services/data.service";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  ToastController
} from "ionic-angular";

import { ImageViewPage } from "./../image-view/image-view";

import { NasaData } from "../../app/model/data.model";
import { Storage } from "@ionic/storage";
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
    public navParams: NavParams,
    private storage: Storage,
    private modalCtrl: ModalController,
    private dataService: DataService,
    private toastCtrl: ToastController
  ) {
    this.data = [];
    this.localDirectory = "";
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad FavoritesPage");
  }
  ionViewWillEnter() {
    this.dataService.getData("favArray").then((dataArray: NasaData[]) => {
      this.data = dataArray;
    });
    // this.storage.get("favArray").then((dataArray: NasaData[]) => {
    //   if (dataArray) {
    //     this.data = dataArray;
    //   }
    // });
    this.localDirectory = this.dataService.getFileDirectory();
  }

  openFavDetail(item: NasaData) {
    this.navCtrl.push(FavDetailPage, {
      data: item,
      category: "favArray"
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: "top"
    });
    toast.present();
  }
}
