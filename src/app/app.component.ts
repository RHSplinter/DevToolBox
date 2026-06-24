import {Component, ChangeDetectionStrategy} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {NavListComponent} from "./component/nav-list/nav-list.component";
import {MatSidenavModule} from "@angular/material/sidenav";

@Component({
    selector: "app-root",
    imports: [RouterOutlet, NavListComponent, MatSidenavModule],
    templateUrl: "./app.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrl: "./app.component.scss"
})
export class AppComponent {
}
