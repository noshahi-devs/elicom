import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
  imports: [CommonModule, RouterModule, RouterLink]
})
export class Sidebar {

  collapsed = false;
  activeItem = 'dashboard';

  @Output() toggleCollapseEvent = new EventEmitter<boolean>();

  toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.toggleCollapseEvent.emit(this.collapsed);
  }

  setActive(id: string) {
    this.activeItem = id;
  }
}
