import {ApplicationConfig} from "@angular/core";
import {provideRouter, TitleStrategy} from "@angular/router";

import {routes} from "./app.routes";
import {PageTitleStrategy} from "./strategy/page-title.strategy";
import {HIGHLIGHTJS_CONFIG, HighlightJsConfig} from "ngx-highlight-js"

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: TitleStrategy,
      useClass: PageTitleStrategy
    },
    {
      provide: HIGHLIGHTJS_CONFIG,
      useValue: {
        lang: "json",
        mode: "simple",
      } as HighlightJsConfig
    },
  ]
};
