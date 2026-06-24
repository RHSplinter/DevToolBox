import {ComponentFixture, TestBed} from "@angular/core/testing";
import {ChangeDetectorRef} from "@angular/core";

import {JsonValidatorComponent} from "./json-validator.component";

describe(JsonValidatorComponent.name, () => {
  let component: JsonValidatorComponent;
  let fixture: ComponentFixture<JsonValidatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [JsonValidatorComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(JsonValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create Json Validator component", () => {
    expect(component).toBeTruthy();
  });

  it("should show an input text area and a json viewer", () => {
    const textArea = fixture.nativeElement.querySelector("app-text-area");
    const jsonViewer = fixture.nativeElement.querySelector("app-json-viewer");
    expect(textArea).toBeTruthy();
    expect(jsonViewer).toBeTruthy();
  });

  it("should show the formatted json object", () => {
    const inputObj: object = {name: "John Doe", age: 42};
    const input: string = JSON.stringify(inputObj);
    component.validateJson(input);
    fixture.debugElement.injector.get(ChangeDetectorRef).detectChanges();
    const jsonOutput = fixture.nativeElement.querySelector("app-json-viewer textarea");
    expect(jsonOutput.textContent).toEqual(JSON.stringify(inputObj, null, 4));
  });

  it("should show an empty text, if input is empty", () => {
    component.validateJson("");
    fixture.detectChanges();
    const jsonOutput = fixture.nativeElement.querySelector("app-json-viewer textarea");
    expect(jsonOutput.textContent).toEqual("");
  });

  it("should show the error, if parsing error is thrown", () => {
    component.validateJson("{");
    fixture.debugElement.injector.get(ChangeDetectorRef).detectChanges();
    const jsonOutput = fixture.nativeElement.querySelector("app-json-viewer textarea");
    expect(jsonOutput.textContent).toEqual("Expected property name or '}' in JSON at position 1 (line 1 column 2)");
  });
});
