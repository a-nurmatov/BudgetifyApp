import { Component } from '@angular/core';
import {
  faArrowDownWideShort,
  faCircleArrowUp,
  faCircleArrowDown,
  faCirclePlus,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  faArrowDownWideShort = faArrowDownWideShort;
  faCircleArrowUp = faCircleArrowUp;
  faCircleArrowDown = faCircleArrowDown;
  faCirclePlus = faCirclePlus;
  constructor() {}
}
