import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import "web-animations-js/web-animations.min"; // to make Angular animation work in iOS and Android

import { AppModule } from "./app.module";

platformBrowserDynamic().bootstrapModule(AppModule);
