import {ComponentFixture, TestBed} from "@angular/core/testing";
import {ChangeDetectorRef} from "@angular/core";

import {Base64EncoderComponent} from "./base64-encoder.component";
import {EncodingService} from "../../../service/encoding.service";
import {EncodingOptions} from "../../../model/encoding-options";
import SpyObj = jasmine.SpyObj;

describe(Base64EncoderComponent.name, () => {
  let component: Base64EncoderComponent;
  let fixture: ComponentFixture<Base64EncoderComponent>;
  let encodingService: SpyObj<EncodingService>;

  beforeEach(() => {
    const encodingServiceSpy = jasmine.createSpyObj("EncodingService", ["encode", "decode", "urlEncode", "urlDecode"]);
    TestBed.configureTestingModule({
      imports: [Base64EncoderComponent],
      providers: [{provide: EncodingService, useValue: encodingServiceSpy}]
    }).compileComponents();

    fixture = TestBed.createComponent(Base64EncoderComponent);
    component = fixture.componentInstance;
    encodingService = TestBed.inject(EncodingService) as SpyObj<EncodingService>;
    fixture.autoDetectChanges();
  });

  it("should create base64 encoder component", () => {
    expect(component).toBeTruthy();
  });

  it("should show an input text area", () => {
    const gridTiles = fixture.nativeElement.querySelectorAll("mat-grid-list mat-grid-tile");
    const textArea = gridTiles[0].querySelector("div app-text-area");
    expect(textArea).toBeTruthy();
  });

  it("should show an output text area", () => {
    const gridTiles = fixture.nativeElement.querySelectorAll("mat-grid-list mat-grid-tile");
    const readonlyTextArea = gridTiles[1].querySelector("div app-readonly-text-area");
    expect(readonlyTextArea).toBeTruthy();
  });

  it("should populate output without encoding", () => {
    component.selectedOption = "";
    component.transform("Value");
    fixture.debugElement.injector.get(ChangeDetectorRef).detectChanges();
    const readOnlyTextArea = fixture.nativeElement.querySelector("app-readonly-text-area textarea");
    expect(readOnlyTextArea.value).toEqual("Value");
  });

  it("should encode value to base64 if encode is selected", () => {
    encodingService.encode.and.returnValue("VmFsdWU=")
    component.selectedOption = EncodingOptions.ENCODE;
    component.transform("Value");
    fixture.debugElement.injector.get(ChangeDetectorRef).detectChanges();
    const readOnlyTextArea = fixture.nativeElement.querySelector("app-readonly-text-area textarea");
    expect(encodingService.encode).toHaveBeenCalledWith("Value");
    expect(readOnlyTextArea.value).toEqual("VmFsdWU=");
  });

  it("should decode value from base64 if decode is selected", () => {
    encodingService.decode.and.returnValue("Value");
    component.selectedOption = EncodingOptions.DECODE;
    component.transform("VmFsdWU=");
    fixture.debugElement.injector.get(ChangeDetectorRef).detectChanges();
    const readOnlyTextArea = fixture.nativeElement.querySelector("app-readonly-text-area textarea");
    expect(encodingService.decode).toHaveBeenCalledWith("VmFsdWU=");
    expect(readOnlyTextArea.value).toEqual("Value");
  });

  it("should url encode value to base64 if urlEncode is selected", () => {
    encodingService.urlEncode.and.returnValue("https%3A%2F%2Fgoogle.com%3F");
    component.selectedOption = EncodingOptions.URL_ENCODE;
    component.transform("https://google.com?");
    fixture.debugElement.injector.get(ChangeDetectorRef).detectChanges();
    const readOnlyTextArea = fixture.nativeElement.querySelector("app-readonly-text-area textarea");
    expect(encodingService.urlEncode).toHaveBeenCalledWith("https://google.com?");
    expect(readOnlyTextArea.value).toEqual("https%3A%2F%2Fgoogle.com%3F");
  });

  it("should url decode value from base64 if urlDecode is selected", () => {
    encodingService.urlDecode.and.returnValue("https://google.com?");
    component.selectedOption = EncodingOptions.URL_DECODE;
    component.transform("https%3A%2F%2Fgoogle.com%3F");
    fixture.debugElement.injector.get(ChangeDetectorRef).detectChanges();
    const readOnlyTextArea = fixture.nativeElement.querySelector("app-readonly-text-area textarea");
    expect(encodingService.urlDecode).toHaveBeenCalledWith("https%3A%2F%2Fgoogle.com%3F");
    expect(readOnlyTextArea.value).toEqual("https://google.com?");
  });

  it("should show an error message if encoding fails", () => {
    encodingService.decode.and.throwError("Invalid Base64 string");
    component.selectedOption = EncodingOptions.DECODE;
    component.transform("https://google.com?");
    fixture.debugElement.injector.get(ChangeDetectorRef).detectChanges();
    const readOnlyTextArea = fixture.nativeElement.querySelector("app-readonly-text-area textarea");
    expect(encodingService.decode).toHaveBeenCalledWith("https://google.com?");
    expect(readOnlyTextArea.value).toEqual("Invalid input: Unable to decode text");
  });
});
