import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { AlertController } from "ionic-angular";

import { EmailComposer } from "@ionic-native/email-composer";

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
    private alertCtrl: AlertController,
    private emailComposer: EmailComposer
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

  sendFeedback() {
    this.emailComposer.requestPermission().then(granted => {
      if (granted) {
        this.emailComposer.isAvailable().then((available: boolean) => {
          if (available) {
            //Now we know we can send
            console.log(available);
            let email = {
              to: "kumard8308887772@gmail.com",
              subject: "Feedback",
              body: "How are you? Nice greetings from Leipzig"
            };

            // Send a text message using default options
            this.emailComposer.open(email);
          }
        });
      }
    });
  }
}
