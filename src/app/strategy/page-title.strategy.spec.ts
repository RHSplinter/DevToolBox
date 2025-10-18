import {DOCUMENT} from '@angular/core';
import {PageTitleStrategy} from "./page-title.strategy";
import {provideRouter, Router, TitleStrategy} from "@angular/router";
import {fakeAsync, TestBed, tick} from "@angular/core/testing";
import {provideLocationMocks} from "@angular/common/testing";
import {HomeComponent} from "../component/home/home.component";

describe(PageTitleStrategy.name, () => {
  let router: Router;
  let document: Document;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideLocationMocks(),
        provideRouter([]),
        {
          provide: TitleStrategy,
          useClass: PageTitleStrategy
        }
      ]
    });
    router = TestBed.inject(Router);
    document = TestBed.inject(DOCUMENT);
  });

  it("should set the app name, if title is not provided", fakeAsync(() => {
    router.resetConfig([{path: "home", component: HomeComponent}]);
    router.navigateByUrl("/home");
    tick();
    expect(document.title).toBe("Dev's ToolBox");
  }));

  it("should set the app name, if title is an empty string", fakeAsync(() => {
    router.resetConfig([{path: "home", title: "", component: HomeComponent}]);
    router.navigateByUrl("/home");
    tick();
    expect(document.title).toBe("Dev's ToolBox");
  }));

  it("should append the app name, if title is provided", fakeAsync(() => {
    router.resetConfig([{path: "home", title: "Home", component: HomeComponent}]);
    router.navigateByUrl("/home");
    tick();
    expect(document.title).toBe("Home | Dev's ToolBox");
  }));
});
