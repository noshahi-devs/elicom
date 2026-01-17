import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip'; // Add this

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatTooltipModule], // Add this
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  @Input() sidebarCollapsed = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  toggle() {
    this.toggleSidebar.emit();
  }

collapsed: any;
toggleCollapse() {
throw new Error('Method not implemented.');
}
  @Output() toggleSidebarEvent = new EventEmitter<void>();
  isDarkMode = false;

  

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-theme', this.isDarkMode);
  }
}