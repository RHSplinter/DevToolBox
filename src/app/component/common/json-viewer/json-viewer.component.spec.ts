import {ComponentFixture, TestBed} from "@angular/core/testing";

import {JsonViewerComponent} from "./json-viewer.component";
import {HarnessLoader} from "@angular/cdk/testing";
import {TestbedHarnessEnvironment} from "@angular/cdk/testing/testbed";
import {MatSelectHarness} from "@angular/material/select/testing";
import {MatOptionHarness} from "@angular/material/core/testing";

describe(JsonViewerComponent.name, () => {
  const inputObject: object = {
    name: "John Doe",
    age: 42,
    cart: [{item: "apple", price: 1.20}, {item: "banana", price: 0.80}]
  };

  let component: JsonViewerComponent;
  let fixture: ComponentFixture<JsonViewerComponent>;
  let loader: HarnessLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [JsonViewerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(JsonViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it("should create JSON Viewer component", () => {
    expect(component).toBeTruthy();
  });

  it("should display a header div", () => {
    const header = fixture.nativeElement.querySelector(".section-container .section-header");
    const headerText = header.querySelector(".section-title");
    const spacingSelect = header.querySelector("mat-select");
    const copyButton = header.querySelector("[data-testid='copy-btn']");
    expect(headerText.textContent).toEqual("Output:");
    expect(spacingSelect).toBeTruthy();
    expect(copyButton).toBeTruthy();
  });

  it("should display a textarea to highlight json content", () => {
    const content = fixture.nativeElement.querySelector(".section-content");
    const textarea = content.querySelector("mat-card mat-card-content textarea")
    expect(textarea).toBeTruthy();
    expect(textarea.getAttribute("highlight-js")).toEqual("");
    expect(textarea.getAttribute("lang")).toEqual("json");
  });

  it("should display the formatted json object", () => {
    component.jsonInput = inputObject;
    component.ngOnChanges();
    fixture.detectChanges();
    const textarea = fixture.nativeElement.querySelector("textarea");
    expect(textarea.value).toEqual(JSON.stringify(inputObject, null, 4));
  });

  it("should copy the output on button click", () => {
    spyOn(window.navigator.clipboard, "writeText");
    component.jsonInput = inputObject;
    component.ngOnChanges();
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector("[data-testid='copy-btn']");
    button.click();
    expect(window.navigator.clipboard.writeText).toHaveBeenCalledWith(JSON.stringify(inputObject, null, 4));
  });

  it("should not copy the output on button click if output is undefined", () => {
    spyOn(window.navigator.clipboard, "writeText");
    component.jsonInput = undefined;
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector("[data-testid='copy-btn']");
    button.click();
    expect(window.navigator.clipboard.writeText).not.toHaveBeenCalled();
  });

  it("should format the json object with two spacing, if selected", async () => {
    spyOn(JSON, "stringify").and.callThrough();
    const select: MatSelectHarness = await loader.getHarness(MatSelectHarness);
    await select.open();
    const options: MatOptionHarness[] = await select.getOptions();
    expect(options.length).toEqual(2);
    expect(await options[0].getText()).toEqual("2 spaces");
    expect(await options[1].getText()).toEqual("4 spaces");
    await options[0].click();
    component.jsonInput = inputObject;
    component.ngOnChanges();
    expect(JSON.stringify).toHaveBeenCalledWith(inputObject, null, 2);
  });

  it("should reformat the json object with selected spacing, on value changed", async () => {
    spyOn(JSON, "stringify").and.callThrough();
    component.jsonInput = inputObject;
    component.ngOnChanges();
    const select: MatSelectHarness = await loader.getHarness(MatSelectHarness);
    await select.open();
    const options: MatOptionHarness[] = await select.getOptions();
    await options[0].click();
    expect(JSON.stringify).toHaveBeenCalledWith(inputObject, null, 4);
    expect(JSON.stringify).toHaveBeenCalledWith(inputObject, null, 2);
  });

  it("should default to four spacing, if selected spacing is undefined", () => {
    spyOn(JSON, "stringify").and.callThrough();
    component.spacingControl.setValue(null);
    component.jsonInput = inputObject;
    component.ngOnChanges();
    expect(JSON.stringify).toHaveBeenCalledWith(inputObject, null, 4);
  });

  it("should filter the json object with a given JSON Path", () => {
    component.jsonInput = inputObject;
    component.filterControl.setValue("$.cart[*].item");
    expect(component.formattedJsonObject).toEqual(JSON.stringify(["apple", "banana"], null, 4));
  });

  it("should reset the displayed json object, after removing the filter", () => {
    component.jsonInput = inputObject;
    component.filterControl.setValue("$.name");
    expect(component.formattedJsonObject).toEqual(JSON.stringify(["John Doe"], null, 4));
    component.filterControl.setValue("");
    expect(component.formattedJsonObject).toEqual(JSON.stringify(inputObject, null, 4));
  });

  it("should display an empty array if no data matches the filter", () => {
    component.jsonInput = inputObject;
    component.filterControl.setValue("$.lastName");
    expect(component.formattedJsonObject).toEqual("[]");
  });

  it("should display an empty value, if filter is reset and input is null", () => {
    component.filterControl.setValue("");
    expect(component.formattedJsonObject).toEqual("");
  });

  it("should filter on an empty object, if filter is set and input is null", () => {
    component.filterControl.setValue("$.name");
    expect(component.formattedJsonObject).toEqual("[]");
  });
});
