import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { AlertController } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-settings",
  templateUrl: "settings.html"
})
export class SettingsPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad SettingsPage");
  }

  clearRecents() {
    this.storage.set("recentsArray", []);
    this.showAlert();
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: "All recents cleared!",
      subTitle: "",
      buttons: ["OK"]
    });
    alert.present();
  }
}
