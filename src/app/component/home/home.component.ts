import {Component} from "@angular/core";
import {MatDividerModule} from "@angular/material/divider";
import {FooterComponent} from "../footer/footer.component";

@Component({
    selector: "app-home",
    imports: [MatDividerModule, FooterComponent],
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.scss"
})
export class HomeComponent {
}
