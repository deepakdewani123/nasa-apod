import { ImageViewPage } from "./../image-view/image-view";
import { Component } from "@angular/core";
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { Platform } from "ionic-angular";

import {
  IonicPage,
  NavController,
  NavParams,
  ModalController
} from "ionic-angular";
import { DataService } from "../../app/services/data.service";
import { NasaData } from "../../app/model/data.model";

@IonicPage()
@Component({
  selector: "page-today",
  templateUrl: "today.html"
})
export class TodayPage {
  nasaData: NasaData;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dataService: DataService,
    private modalCtrl: ModalController,
    private screenOrientation: ScreenOrientation,
    private platform: Platform
  ) {
    this.nasaData = new NasaData();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad TodayPage");
    this.platform.ready().then(() => {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    });
    this.dataService.getTodayData(false).subscribe(
      result => {
        // console.log(result);
        this.nasaData = new NasaData({
          title: result.title,
          explanation: result.explanation,
          date: result.date,
          copyright: result.copyright,
          url: result.url,
          hdurl: result.hdurl,
          loaded: false,
          isHDImage: false
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter TodayPage");
  }

  openImageView() {
    let modal = this.modalCtrl.create(
      ImageViewPage,
      {
        imageUrl: this.nasaData.hdurl
      },
      {
        // enterAnimation: "modal-scale-up-enter",
        // leaveAnimation: "modal-scale-up-leave"
      }
    );
    modal.present();
  }
}
