import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController
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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private modalCtrl: ModalController
  ) {
    this.data = [];
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad FavoritesPage");
  }
  ionViewWillEnter() {
    this.storage.get("favArray").then((dataArray: NasaData[]) => {
      if (dataArray) {
        this.data = dataArray;
      }
    });
  }

  openFavDetail(item: NasaData) {
    this.navCtrl.push(FavDetailPage, {
      data: item
    });
    // let modal = this.modalCtrl.create(
    //   SearchResultPage,
    //   {
    //     imageUrl: item.hdurl,
    //     date: item.date,
    //     title: item.title
    //   },
    //   {
    //     // enterAnimation: "modal-scale-up-enter",
    //     // leaveAnimation: "modal-scale-up-leave"
    //   }
    // );
    // modal.present();
  }
}
