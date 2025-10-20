import {Component} from "@angular/core";
import {MatDividerModule} from "@angular/material/divider";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {FooterComponent} from "../footer/footer.component";

@Component({
    selector: "app-error",
    imports: [MatDividerModule, MatButtonModule, RouterLink, FooterComponent],
    templateUrl: "./error.component.html",
    styleUrl: "./error.component.scss"
})
export class ErrorComponent {
}
