import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { navItems } from './nav-item.config';
import { NavItem } from './nav-item.model';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  arrowRightFromBracket = faArrowRightFromBracket;
  navLinks: NavItem[] = navItems;
  @Input() isLoggedIn: boolean = false;
  @Output() logOutClicked: EventEmitter<void> = new EventEmitter<void>();
  userFullName!: string | null;

  constructor() {}

  onClick(): boolean {
    this.logOutClicked.emit();
    return false;
  }

  ngOnInit(): void {
    this.userFullName = localStorage.getItem('fullName');
  }
}
