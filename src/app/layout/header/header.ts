import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatTooltipModule, NgIf], // Add this
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
  @Output() toggleSidebarEvent = new EventEmitter<void>();
  isDarkMode = false;

  

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-theme', this.isDarkMode);
  }
}