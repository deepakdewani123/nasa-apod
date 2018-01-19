import { Component } from "@angular/core";

import { SettingsPage } from "./../settings/settings";
import { TodayPage } from "./../today/today";
import { FavoritesPage } from "../favorites/favorites";

// import { AboutPage } from '../about/about';
// import { ContactPage } from '../contact/contact';
// import { HomePage } from '../home/home';

@Component({
  templateUrl: "tabs.html"
})
export class TabsPage {
  tab1Root = TodayPage;
  tab2Root = FavoritesPage;
  tab3Root = SettingsPage;

  constructor() {}
}
