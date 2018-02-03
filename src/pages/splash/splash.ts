import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";

@IonicPage()
@Component({
  selector: "page-splash",
  templateUrl: "splash.html"
})
export class SplashPage {
  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public splashScreen: SplashScreen
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad SplashPage");
  }

  ionViewWillEnter() {
    this.splashScreen.hide();

    setTimeout(() => {
      this.viewCtrl.dismiss();
    }, 1700);
  }
}
