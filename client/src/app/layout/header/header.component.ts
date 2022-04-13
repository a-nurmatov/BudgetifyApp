import { Component, EventEmitter, Input, Output } from '@angular/core';
import { navItems } from './nav-item.config';
import { NavItem } from './nav-item.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  navLinks: NavItem[] = navItems;
  @Input() isLoggedIn: boolean = false;
  @Output() logOutClicked: EventEmitter<void> = new EventEmitter<void>();
  userFullName!: string | null;

  constructor() {
    this.userFullName = localStorage.getItem('fullName');
  }

  onClick(): boolean {
    this.logOutClicked.emit();
    return false;
  }
}
