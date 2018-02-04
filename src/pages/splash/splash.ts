import { StatusBar } from "@ionic-native/status-bar";
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
    public splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad SplashPage");
    // this.statusBar.hide();
  }

  ionViewWillEnter() {
    console.log("will appear");
    this.splashScreen.hide();
    this.statusBar.hide();

    setTimeout(() => {
      this.viewCtrl.dismiss();
    }, 1600);
  }
}
