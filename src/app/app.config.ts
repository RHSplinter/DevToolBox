import { ApplicationConfig } from "@angular/core";
import { provideRouter, TitleStrategy } from "@angular/router";

import { routes } from "./app.routes";
import { PageTitleStrategy } from "./strategy/page-title.strategy";
import { HIGHLIGHTJS_CONFIG, HighlightJsConfig } from "ngx-highlight-js"
import { provideHttpClient, withFetch } from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
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
