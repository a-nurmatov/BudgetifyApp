import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { navItems } from './nav-item.config';
import { NavItem } from './nav-item.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  navLinks: NavItem[] = navItems;
  @Input() isLoggedIn: boolean = false;
  @Output() logOutClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.logOutClicked.emit();
    return false;
  }
}
