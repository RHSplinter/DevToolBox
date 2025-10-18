import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";

@Component({
    selector: "app-text-area",
    imports: [CommonModule, MatButtonModule, ReactiveFormsModule, MatSelectModule],
    templateUrl: "./text-area.component.html",
    styleUrls: ["./text-area.component.scss", "../../../styles/tools-styles.scss"]
})
export class TextAreaComponent implements OnInit {
  @Input() options!: string[] | undefined;
  @Input() headerText: string = "Input:"
  @Output() inputChanged: EventEmitter<string> = new EventEmitter<string>();
  @Output() optionChanged: EventEmitter<string> = new EventEmitter<string>();
  input: FormControl<string | null> = new FormControl<string>("");
  selectedOption: FormControl<string | null> = new FormControl<string>("");

  clearInput(): void {
    this.input.setValue("");
  }

  ngOnInit(): void {
    this.input.valueChanges.subscribe((value: string | null) => this.inputChanged.emit(value || ""));
    this.selectedOption.valueChanges.subscribe((value: string | null) => this.optionChanged.emit(value || ""));
    if (this.options != null) {
      this.selectedOption.setValue(this.options[0]);
    }
  }
}
