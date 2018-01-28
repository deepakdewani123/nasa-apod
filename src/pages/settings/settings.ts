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
    this.showConfirm();
  }
  clearFavorites() {
    this.storage.set("favArray", []);
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: "Are you sure?",
      message: "All you recents will be deleted",
      buttons: [
        {
          text: "Cancel",
          handler: () => {
            console.log("Disagree clicked");
          }
        },
        {
          text: "OK",
          handler: () => {
            console.log("Agree clicked");
            this.storage.set("recentsArray", []);
          }
        }
      ]
    });
    confirm.present();
  }
}
