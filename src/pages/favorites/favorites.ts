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
    private storage: Storage,
    private modalCtrl: ModalController
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

  openImageView(item: NasaData) {
    let modal = this.modalCtrl.create(
      ImageViewPage,
      {
        imageUrl: item.hdurl,
        date: item.date,
        title: item.title
      },
      {
        // enterAnimation: "modal-scale-up-enter",
        // leaveAnimation: "modal-scale-up-leave"
      }
    );
    modal.present();
  }
}
