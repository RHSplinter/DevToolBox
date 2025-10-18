import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";

@Component({
    selector: "app-readonly-text-area",
    imports: [CommonModule, MatButtonModule],
    templateUrl: "./readonly-text-area.component.html",
    styleUrls: ["./readonly-text-area.component.scss", "../../../styles/tools-styles.scss"]
})
export class ReadonlyTextAreaComponent {
  @Input() output: string = "";

  copyToClipboard(): void {
    navigator.clipboard.writeText(this.output);
  }
}
