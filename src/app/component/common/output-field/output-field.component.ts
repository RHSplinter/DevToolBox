import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {ClipboardModule} from "ngx-clipboard";

@Component({
    selector: "app-output-field",
    imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, ClipboardModule],
    templateUrl: "./output-field.component.html",
    styleUrl: "./output-field.component.scss"
})
export class OutputFieldComponent {
  @Input() label!: string;
  @Input() value!: string;

  getTestId(): string {
    if (this.label == null || this.label.length === 0) {
      return "output-field";
    }
    return `output-${this.label.toLowerCase().replaceAll(" ", "-")}`;
  }
}
