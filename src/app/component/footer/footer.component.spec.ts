import {ComponentFixture, TestBed} from "@angular/core/testing";

import {FooterComponent} from "./footer.component";
import {appConfig} from "../../app.config";

describe(FooterComponent.name, () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [appConfig.providers]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create footer component", () => {
    expect(component).toBeTruthy();
  });

  it("should divide footer from content", () => {
    const divider = fixture.nativeElement.querySelector("mat-divider");
    expect(divider).toBeTruthy();
  });

  it("should display a link with a GitHub icon", () => {
    const githubIcon = fixture.nativeElement.querySelector("[data-testid='github-icon']");
    expect(githubIcon.href).toEqual("https://github.com/RHSplinter/DevToolBox");
    expect(githubIcon.querySelector("i").classList).toContain("fa-github");
  });

  it("should display a link with a LinkedIn icon", () => {
    const linkedInIcon = fixture.nativeElement.querySelector("[data-testid='linkedin-icon']");
    expect(linkedInIcon.href).toEqual("https://www.linkedin.com/in/raymond-splinter");
    expect(linkedInIcon.querySelector("i").classList).toContain("fa-linkedin");
  });
});
