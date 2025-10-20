import {ComponentFixture, TestBed} from "@angular/core/testing";

import {OutputFieldComponent} from "./output-field.component";
import {ClipboardModule} from "ngx-clipboard";

describe(OutputFieldComponent.name, () => {
  let component: OutputFieldComponent;
  let fixture: ComponentFixture<OutputFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OutputFieldComponent, ClipboardModule],
      providers: [Clipboard]
    }).compileComponents();

    fixture = TestBed.createComponent(OutputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create Output Field component", () => {
    expect(component).toBeTruthy();
  });

  it("should display given label and input value", () => {
    component.label = "Label";
    component.value = "Value";
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector("label");
    const input = fixture.nativeElement.querySelector("input");
    expect(label.textContent).toContain("Label");
    expect(input.value).toContain("Value");
  });

  it("should create a test id based on label", () => {
    component.label = "ISO 8601 Id";
    const testId: string = component.getTestId();
    expect(testId).toBe("output-iso-8601-id");
  });

  it("should return base test id if label is null", () => {
    const testId: string = component.getTestId();
    expect(testId).toBe("output-field");
  });
});
