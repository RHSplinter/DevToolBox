import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatDividerModule} from "@angular/material/divider";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {FooterComponent} from "../footer/footer.component";

@Component({
    selector: "app-error",
    imports: [CommonModule, MatDividerModule, MatButtonModule, RouterLink, FooterComponent],
    templateUrl: "./error.component.html",
    styleUrl: "./error.component.scss"
})
export class ErrorComponent {
}
