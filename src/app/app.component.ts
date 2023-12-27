import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterOutlet} from '@angular/router';
import {NavListComponent} from "./component/nav-list/nav-list.component";
import {MatSidenavModule} from "@angular/material/sidenav";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavListComponent, MatSidenavModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
