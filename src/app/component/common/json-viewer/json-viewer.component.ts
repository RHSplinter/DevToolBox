import {Component, Input, OnChanges, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HighlightJsDirective} from "ngx-highlight-js";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {JSONPath} from "jsonpath-plus";


@Component({
    selector: "app-json-viewer",
    imports: [CommonModule, HighlightJsDirective, MatCardModule, MatButtonModule, MatSelectModule, ReactiveFormsModule, MatInputModule],
    templateUrl: "./json-viewer.component.html",
    styleUrls: ["./json-viewer.component.scss", "../../../styles/tools-styles.scss"]
})
export class JsonViewerComponent implements OnChanges, OnInit {
  readonly spacingOptions: string[] = ["2", "4"]

  @Input() jsonInput: object | string | undefined;
  formattedJsonObject: string | undefined;
  spacingControl: FormControl<string | null> = new FormControl<string>("4");
  filterControl: FormControl<string | null> = new FormControl<string>("");

  copyToClipboard(): void {
    if (this.formattedJsonObject == null) {
      return;
    }
    navigator.clipboard.writeText(this.formattedJsonObject);
  }

  ngOnInit() {
    this.spacingControl.valueChanges.subscribe(
      () => this.formattedJsonObject = this.stringifyJsonObject(this.jsonInput || ""));
    this.filterControl.valueChanges.subscribe(() => this.filterJsonObject());
  }

  ngOnChanges(): void {
    this.formattedJsonObject = this.stringifyJsonObject(this.jsonInput || "");
  }

  private stringifyJsonObject(jsonObject: object | string): string {
    if (typeof jsonObject === "string") {
      return jsonObject as string;
    }
    const spacing: number = parseInt(this.spacingControl.value || "4");
    return JSON.stringify(jsonObject, null, spacing);
  }

  private filterJsonObject(): void {
    if (!this.filterControl.value) {
      this.formattedJsonObject = this.stringifyJsonObject(this.jsonInput || "");
      return;
    }
    const result = JSONPath({path: this.filterControl.value, json: this.jsonInput || {}});
    this.formattedJsonObject = this.stringifyJsonObject(result);
  }
}
