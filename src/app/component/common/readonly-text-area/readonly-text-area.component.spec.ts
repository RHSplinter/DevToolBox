import {ComponentFixture, TestBed} from "@angular/core/testing";

import {ReadonlyTextAreaComponent} from "./readonly-text-area.component";

describe(ReadonlyTextAreaComponent.name, () => {
  let component: ReadonlyTextAreaComponent;
  let fixture: ComponentFixture<ReadonlyTextAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReadonlyTextAreaComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ReadonlyTextAreaComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it("should create readonly textarea component", () => {
    expect(component).toBeTruthy();
  });

  it("should display a header div", () => {
    const header = fixture.nativeElement.querySelector(".section-container .section-header");
    const headerText = header.querySelector(".section-title");
    expect(headerText.textContent).toEqual("Output:");
  });

  it("should display a textarea", () => {
    const content = fixture.nativeElement.querySelector(".section-container .section-content");
    const textarea = content.querySelector(".section-textarea");
    expect(textarea).toBeTruthy();
    expect(textarea.getAttribute("readonly")).toEqual("");
  });

  it("should display the output", () => {
    fixture.componentRef.setInput("output", "value");
    fixture.detectChanges();
    const textarea = fixture.nativeElement.querySelector(".section-textarea");
    expect(textarea.value).toEqual("value");
  });

  it("should copy the output on button click", () => {
    spyOn(window.navigator.clipboard, "writeText");
    component.output = "Value";
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector("[data-testid='copy-btn']");
    button.click();
    expect(window.navigator.clipboard.writeText).toHaveBeenCalledWith("Value");
  });
});
