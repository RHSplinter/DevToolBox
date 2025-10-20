import {ComponentFixture, TestBed} from "@angular/core/testing";

import {TextAreaComponent} from "./text-area.component";
import {HarnessLoader} from "@angular/cdk/testing";
import {TestbedHarnessEnvironment} from "@angular/cdk/testing/testbed";
import {MatSelectHarness} from "@angular/material/select/testing";
import {MatOptionHarness} from "@angular/material/core/testing";

type InputParameter = {
  input: string | null,
  expectedValue: string
}

describe(TextAreaComponent.name, () => {
  const emitInputParameters: InputParameter[] = [
    {input: "value", expectedValue: "value"},
    {input: null, expectedValue: ""}
  ];

  let component: TextAreaComponent;
  let fixture: ComponentFixture<TextAreaComponent>;
  let loader: HarnessLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TextAreaComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TextAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it("should create textarea component", () => {
    expect(component).toBeTruthy();
  });

  it("should display a header div", () => {
    const header = fixture.nativeElement.querySelector(".section-container .section-header");
    const headerText = header.querySelector(".section-title");
    const button = header.querySelector("button");
    expect(headerText.textContent).toEqual("Input:");
    expect(button.textContent.trim()).toEqual("Clear");
  });

  it("should display a textarea", () => {
    const content = fixture.nativeElement.querySelector(".section-container .section-content");
    const textarea = content.querySelector(".section-textarea");
    expect(textarea).toBeTruthy();
  });

  it("should show a select field, if options is populated", async () => {
    component.options = ["encode", "decode"];
    fixture.detectChanges();
    const select: MatSelectHarness = await loader.getHarness(MatSelectHarness);
    await select.open();
    const options: MatOptionHarness[] = await select.getOptions();
    expect(options.length).toEqual(2);
    expect(await options[0].getText()).toEqual("encode");
    expect(await options[1].getText()).toEqual("decode");
  });

  it("should be able to select and update options", async () => {
    spyOn(component.optionChanged, "emit").and.callFake((value: string) => expect(value).toEqual("decode"));
    component.options = ["encode", "decode"];
    fixture.detectChanges();
    const select: MatSelectHarness = await loader.getHarness(MatSelectHarness);
    await select.open();
    const options: MatOptionHarness[] = await select.getOptions();

    await options[1].click();
    expect(await select.getValueText()).toEqual("decode");
    expect(component.selectedOption.value).toEqual("decode");
    expect(component.optionChanged.emit).toHaveBeenCalledOnceWith("decode");
  });

  it("should emit empty string if selectedOption is null", () => {
    spyOn(component.optionChanged, "emit").and.callFake((value: string) => expect(value).toEqual(""));
    component.selectedOption.setValue(null);
    expect(component.optionChanged.emit).toHaveBeenCalledOnceWith("");
  });

  it("should not show a select field, if options is undefined", async () => {
    const select: MatSelectHarness | null = await loader.getHarnessOrNull(MatSelectHarness);
    expect(select).toBeNull();
  });

  emitInputParameters.forEach((parameter: InputParameter) => {
    it(`should emit '${parameter.expectedValue}' on input changed`, () => {
      spyOn(component.inputChanged, "emit").and.callFake(
        (value: string) => expect(value).toEqual(parameter.expectedValue));
      component.input.setValue(parameter.input);
      expect(component.inputChanged.emit).toHaveBeenCalledWith(parameter.expectedValue);
    });
  });

  it("should clear the input on clear button pressed", () => {
    spyOn(component.inputChanged, "emit");
    component.input.setValue("Value");
    const button = fixture.nativeElement.querySelector("[data-testid='clear-btn']");
    button.click();
    const textarea = fixture.nativeElement.querySelector(".section-textarea");
    expect(textarea.textContent).toEqual("");
    expect(component.inputChanged.emit).toHaveBeenCalledWith("");
  });
});
