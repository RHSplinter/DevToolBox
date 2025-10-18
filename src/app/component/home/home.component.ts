import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatDividerModule} from "@angular/material/divider";
import {FooterComponent} from "../footer/footer.component";

@Component({
    selector: "app-home",
    imports: [CommonModule, MatDividerModule, FooterComponent],
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.scss"
})
export class HomeComponent {
}
