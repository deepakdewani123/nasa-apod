import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
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
    private dataService: DataService
  ) {
    this.nasaData = new NasaData();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad TodayPage");

    this.dataService.getTodayData(false).subscribe(
      result => {
        console.log(result);
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
}
