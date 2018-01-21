import { RecentsPage } from "./../recents/recents";
import { Component } from "@angular/core";
// import { Subject } from "rxjs/Subject";

import { SettingsPage } from "./../settings/settings";
import { TodayPage } from "./../today/today";
import { FavoritesPage } from "../favorites/favorites";

// import {
//   trigger,
//   state,
//   style,
//   animate,
//   transition
// } from "@angular/animations";

@Component({
  templateUrl: "tabs.html"
  // animations: [
  //   trigger("visibility", [
  //     state(
  //       "shown",
  //       style({
  //         bottom: "0px"
  //       })
  //     ),
  //     state(
  //       "hidden",
  //       style({
  //         bottom: "-70px"
  //       })
  //     ),
  //     transition("shown <=> hidden", animate(".2s .7s"))
  //   ])
  // ]
})
export class TabsPage {
  // visibility: string;
  // private visibility = new Subject<any>();

  tab1Root = TodayPage;
  tab2Root = RecentsPage;
  tab3Root = FavoritesPage;
  tab4Root = SettingsPage;

  constructor() {
    // this.visibility = "hidden";
  }
}
