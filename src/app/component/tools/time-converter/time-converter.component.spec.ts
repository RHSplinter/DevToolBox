import {ComponentFixture, TestBed} from "@angular/core/testing";

import {TimeConverterComponent} from "./time-converter.component";
import {TimeConversionOptions} from "../../../model/time-conversion-options";

describe(TimeConverterComponent.name, () => {
  const testDate: Date = new Date(2024, 1, 1);
  const testDateValues: { [format: string]: string } = {
    utc: testDate.toUTCString(),
    local: testDate.toLocaleString(),
    iso: testDate.toISOString(),
    epoch: testDate.getTime().toString(),
    unix: Math.floor(testDate.getTime() / 1000).toString(),
  };

  let component: TimeConverterComponent;
  let fixture: ComponentFixture<TimeConverterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TimeConverterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TimeConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create Time Converter component", () => {
    expect(component).toBeTruthy();
  });

  it("should display input field and controls", () => {
    const header = fixture.nativeElement.querySelector("#time-converter-header");
    const headerText = header.querySelector("h1").textContent;
    const buttons = header.querySelectorAll("button");
    const formatSelector = fixture.nativeElement.querySelector("mat-select");
    const input = fixture.nativeElement.querySelector("[data-testid='timestamp-input']");
    const otherFormatsHeader = fixture.nativeElement.querySelector("[data-testid='other-formats-header']");
    expect(headerText).toEqual("Input:");
    expect(buttons).toHaveSize(2);
    expect(buttons[0].textContent).toEqual("Now");
    expect(buttons[1].textContent).toEqual("Clear");
    expect(formatSelector).toBeTruthy();
    expect(input).toBeTruthy();
    expect(otherFormatsHeader).toBeFalsy();
  });

  it("should set timestamp in correct format when pressed on 'now' button with format epoch", () => {
    const currentTimeButton = fixture.nativeElement.querySelector("[data-testid='current-time-btn']");
    currentTimeButton.click();
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector("[data-testid='timestamp-input']");
    const otherFormatsHeader = fixture.nativeElement.querySelector("[data-testid='other-formats-header']");
    expect(input.value).toBeTruthy();
    expect(input.value).toMatch(/^\d{13}$/);
    expect(otherFormatsHeader).toBeTruthy();
  });

  it("should set timestamp in correct format when pressed on 'now' button with format unix", () => {
    const currentTimeButton = fixture.nativeElement.querySelector("[data-testid='current-time-btn']");
    component.inputFormat.setValue(TimeConversionOptions.UNIX);
    currentTimeButton.click();
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector("[data-testid='timestamp-input']");
    const otherFormatsHeader = fixture.nativeElement.querySelector("[data-testid='other-formats-header']");
    expect(input.value).toBeTruthy();
    expect(input.value).toMatch(/^\d{10}$/);
    expect(otherFormatsHeader).toBeTruthy();
  });

  it("should set timestamp in correct format when pressed on 'now' button with format ISO 8601", () => {
    component.inputFormat.setValue(TimeConversionOptions.ISO);
    const currentTimeButton = fixture.nativeElement.querySelector("[data-testid='current-time-btn']");
    currentTimeButton.click();
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector("[data-testid='timestamp-input']");
    const otherFormatsHeader = fixture.nativeElement.querySelector("[data-testid='other-formats-header']");
    expect(input.value).toBeTruthy();
    expect(Date.parse(input.value)).not.toBeNaN();
    expect(otherFormatsHeader).toBeTruthy();
  });

  Object.values(TimeConversionOptions).forEach((option: TimeConversionOptions) => {
    it(`should convert time from ${option}`, () => {
      const timeFormat: string = option.split(" ")[0].toLowerCase();
      component.inputFormat.setValue(option);
      component.timeConversionForm.get("inputTimestamp")?.setValue(testDateValues[timeFormat]);
      expect(component.timeConversionForm.get("utcTime")?.value).toEqual(testDateValues["utc"]);
      expect(component.timeConversionForm.get("localTime")?.value).toEqual(testDateValues["local"]);
      expect(component.timeConversionForm.get("isoTime")?.value).toEqual(testDateValues["iso"]);
      expect(component.timeConversionForm.get("unixTime")?.value).toEqual(testDateValues["unix"]);
    });
  });

  it("should clear the input and output fields when pressed on 'clear' button", () => {
    component.timeConversionForm.get("inputTimestamp")?.setValue(new Date().getTime());
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector("[data-testid='timestamp-input']");
    expect(input.value).toBeTruthy();
    expect(component.timeConversionForm.get("utcTime")?.value).toBeTruthy();
    const clearButton = fixture.nativeElement.querySelector("[data-testid='clear-btn']");
    clearButton.click();
    fixture.detectChanges();
    const otherFormatsHeader = fixture.nativeElement.querySelector("[data-testid='other-formats-header']");
    expect(input.value).toBeFalsy();
    expect(component.timeConversionForm.get("utcTime")?.value).toBeFalsy();
    expect(otherFormatsHeader).toBeFalsy()
  });

  it("should reset form if input format is changed", () => {
    component.timeConversionForm.get("inputTimestamp")?.setValue(new Date().getTime());
    expect(component.timeConversionForm.get("utcTime")?.value).toBeTruthy();
    component.inputFormat.setValue(TimeConversionOptions.ISO);
    expect(component.timeConversionForm.get("utcTime")?.value).toBeFalsy();
  });

  it("should display error message for invalid timestamp", () => {
    component.timeConversionForm.get("inputTimestamp")?.setValue("Invalid");
    fixture.detectChanges();
    expect(component.timeConversionForm.get("utcTime")?.value).toEqual("Invalid Date");
    expect(component.timeConversionForm.get("localTime")?.value).toEqual("Invalid Date");
    expect(component.timeConversionForm.get("isoTime")?.value).toEqual("Invalid Date");
    expect(component.timeConversionForm.get("unixTime")?.value).toEqual("Invalid Date");
  });

  it("should display error message for invalid timestamp format", () => {
    component.inputFormat.setValue(null);
    component.timeConversionForm.get("inputTimestamp")?.setValue(Date.now());
    fixture.detectChanges();
    expect(component.timeConversionForm.get("utcTime")?.value).toEqual("Invalid Date");
  });
});
