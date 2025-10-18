import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TextAreaComponent} from "../../common/text-area/text-area.component";
import {MatGridListModule} from "@angular/material/grid-list";
import {ReadonlyTextAreaComponent} from "../../common/readonly-text-area/readonly-text-area.component";
import {EncodingService} from "../../../service/encoding.service";
import {EncodingOptions} from "../../../model/encoding-options";

@Component({
    selector: "app-base64-encoder",
    imports: [CommonModule, TextAreaComponent, MatGridListModule, ReadonlyTextAreaComponent],
    templateUrl: "./base64-encoder.component.html",
    styleUrls: ["./base64-encoder.component.scss", "../../../styles/tools-styles.scss"]
})
export class Base64EncoderComponent {
  readonly options: string[] = Object.values(EncodingOptions);

  input: string = "";
  output: string = "";
  selectedOption: string = "";

  constructor(private encodingService: EncodingService) {
  }

  setOptions(selectedOption: string): void {
    this.selectedOption = selectedOption;
    this.transform(this.input);
  }

  transform(input: string): void {
    this.input = input;
    try {
      switch (this.selectedOption) {
        case EncodingOptions.ENCODE:
          this.encode(input);
          break;
        case EncodingOptions.DECODE:
          this.decode(input);
          break;
        case EncodingOptions.URL_ENCODE:
          this.urlEncode(input);
          break;
        case EncodingOptions.URL_DECODE:
          this.urlDecode(input);
          break;
        default:
          this.output = input;
      }
    } catch {
      this.output = `Invalid input: Unable to ${this.selectedOption} text`;
    }
  }

  private encode = (input: string) => this.output = this.encodingService.encode(input);

  private decode = (input: string) => this.output = this.encodingService.decode(input);

  private urlEncode = (input: string) => this.output = this.encodingService.urlEncode(input);

  private urlDecode = (input: string) => this.output = this.encodingService.urlDecode(input);
}
