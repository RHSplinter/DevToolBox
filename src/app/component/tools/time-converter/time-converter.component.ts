import {Component, OnInit} from "@angular/core";
import {CommonModule, DatePipe} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {TimeConversionService} from "../../../service/time-conversion.service";
import {OutputFieldComponent} from "../../common/output-field/output-field.component";
import {TimeConversionOptions} from "../../../model/time-conversion-options";
import {MatSelectModule} from "@angular/material/select";

@Component({
    selector: "app-time-converter",
    imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, ReactiveFormsModule, OutputFieldComponent, MatSelectModule],
    providers: [DatePipe],
    templateUrl: "./time-converter.component.html",
    styleUrl: "./time-converter.component.scss"
})
export class TimeConverterComponent implements OnInit {
  readonly timeConversionOptions: string[] = Object.values(TimeConversionOptions);
  readonly otherDateFormats: string[] = ["yyyy-MM-dd", "yyyy/MM/dd", "MM-dd-yyyy", "MM/dd/yyyy"];

  inputFormat: FormControl<TimeConversionOptions | null> = new FormControl(TimeConversionOptions.EPOCH);
  timeConversionForm: FormGroup = new FormGroup({
    inputTimestamp: new FormControl(),
    utcTime: new FormControl(),
    localTime: new FormControl(),
    isoTime: new FormControl(),
    unixTime: new FormControl(),
  });

  constructor(private timeConversionService: TimeConversionService, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.timeConversionForm.get("inputTimestamp")?.valueChanges.subscribe(() => this.convertTimestamp());
    this.inputFormat.valueChanges.subscribe(() => {
      this.clearInput();
      this.convertTimestamp();
    });
  }

  setCurrentTime(): void {
    let timestamp: string = "";
    switch (this.inputFormat.value) {
      case TimeConversionOptions.EPOCH:
        timestamp = Date.now().toString();
        break;
      case TimeConversionOptions.UNIX:
        timestamp = Math.floor(Date.now() / 1000).toString();
        break;
      case TimeConversionOptions.ISO:
        timestamp = new Date().toISOString();
        break;
    }
    this.timeConversionForm.get("inputTimestamp")?.setValue(timestamp);
  }

  clearInput(): void {
    this.timeConversionForm.reset();
  }

  convertUtcToFormat(format: string): string | null {
    try {
      const utcDate = this.timeConversionForm.get("utcTime")?.value;
      if (utcDate == null || utcDate.trim() == "") {
        return "";
      }
      return this.datePipe.transform(utcDate, format);
    } catch {
      return "Invalid Date";
    }
  }

  private convertTimestamp(): void {
    const timestamp = this.timeConversionForm.get("inputTimestamp")?.value;
    if (timestamp == null || timestamp == "") {
      return;
    }
    const date: Date = this.getDate(timestamp);
    this.timeConversionForm.get("utcTime")?.setValue(this.timeConversionService.convertToUtcTime(date));
    this.timeConversionForm.get("localTime")?.setValue(this.timeConversionService.convertToLocalTime(date));
    this.timeConversionForm.get("isoTime")?.setValue(this.timeConversionService.convertToISOTime(date));
    this.timeConversionForm.get("unixTime")?.setValue(this.timeConversionService.convertToUnixTime(date));
  }

  private getDate(timestamp: string): Date {
    switch (this.inputFormat.value) {
      case TimeConversionOptions.EPOCH:
        return new Date(parseInt(timestamp));
      case TimeConversionOptions.UNIX:
        return new Date(parseInt(timestamp) * 1000);
      case TimeConversionOptions.ISO:
        return new Date(timestamp);
      default:
        return new Date("Invalid Date");
    }
  }
}
