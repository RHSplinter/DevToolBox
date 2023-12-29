import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatListModule} from "@angular/material/list";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {NavListItem} from "../../model/nav-list-item";

@Component({
  selector: "app-nav-list",
  standalone: true,
  imports: [CommonModule, MatListModule, RouterLink, MatIconModule, RouterLinkActive],
  templateUrl: "./nav-list.component.html",
  styleUrl: "./nav-list.component.scss"
})
export class NavListComponent {
  navItems: NavListItem[] = [
    {name: "Base64 Encoder", path: "base64-encoder"},
    {name: "Diff Viewer", path: "diff-viewer"},
    {name: "JSON Validator", path: "json-validator"},
  ];
}
