import {ChangeDetectionStrategy, Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TextAreaComponent} from "../../common/text-area/text-area.component";
import {MatGridListModule} from "@angular/material/grid-list";
import {Change, diffChars} from "diff";
import {MatCardModule} from "@angular/material/card";
import {CdkVirtualForOf, ScrollingModule} from "@angular/cdk/scrolling";
import {ChangeInfo} from "../../../model/change-info";

@Component({
    selector: "app-diff-viewer",
    imports: [CommonModule, TextAreaComponent, MatGridListModule, MatCardModule, CdkVirtualForOf, ScrollingModule],
    templateUrl: "./diff-viewer.component.html",
    styleUrls: ["./diff-viewer.component.scss", "../../../styles/tools-styles.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiffViewerComponent {
  original: string = "";
  updated: string = "";
  changes: ChangeInfo[] = []

  setOriginal(original: string): void {
    this.original = original;
    this.compareChanges();
  }

  setUpdated(updated: string): void {
    this.updated = updated;
    this.compareChanges();
  }

  compareChanges(): void {
    const changes: Change[] = diffChars(this.original, this.updated);
    this.changes = changes.map((change: Change) => {
      return {
        text: this.parseText(change.value),
        className: this.getClassName(change)
      } as ChangeInfo;
    });
  }

  private parseText(text: string): string {
    return text.replaceAll("\n", "<br>").replaceAll(" ", "&nbsp;");
  }

  private getClassName(part: Change): string {
    return part.added ? "diff-added" : part.removed ? "diff-removed" : "diff-unchanged";
  }
}
