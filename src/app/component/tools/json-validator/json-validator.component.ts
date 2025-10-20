import {Component} from "@angular/core";
import {HighlightJsModule} from "ngx-highlight-js";
import {MatGridListModule} from "@angular/material/grid-list";
import {TextAreaComponent} from "../../common/text-area/text-area.component";
import {JsonViewerComponent} from "../../common/json-viewer/json-viewer.component";

@Component({
    selector: "app-json-validator",
    imports: [HighlightJsModule, MatGridListModule, TextAreaComponent, JsonViewerComponent],
    templateUrl: "./json-validator.component.html",
    styleUrls: ["./json-validator.component.scss", "../../../styles/tools-styles.scss"]
})
export class JsonValidatorComponent {
  jsonObject: object | string | undefined;

  validateJson(input: string): void {
    try {
      this.jsonObject = input != "" ? JSON.parse(input) : "";
    } catch (e) {
      this.jsonObject = (e as Error).message;
    }
  }
}
