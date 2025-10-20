import {ComponentFixture, TestBed} from "@angular/core/testing";
import {AppComponent} from "./app.component";
import {provideRouter} from "@angular/router";

describe(AppComponent.name, () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.autoDetectChanges();
    app = fixture.componentInstance;
  });

  it("should create the app", () => {
    expect(app).toBeTruthy();
  });

  it("should have a nav list", () => {
    const sidenav = fixture.nativeElement.querySelector("mat-sidenav-container mat-sidenav");
    const navList = sidenav.querySelector("app-nav-list");

    expect(navList).toBeTruthy();
    expect(sidenav.getAttribute("mode")).toEqual("side")
  });

  it("should have content in the sidenav", () => {
    const sidenavContent = fixture.nativeElement.querySelector("mat-sidenav-container mat-sidenav-content");
    const content = sidenavContent.querySelector("router-outlet");

    expect(content).toBeTruthy();
  });
});
