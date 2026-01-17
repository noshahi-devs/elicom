import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

interface MenuItem {
  id: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class Sidebar {

  collapsed = false;
  activeItem = 'dashboard';

  @Output() toggleCollapseEvent = new EventEmitter<boolean>();

  menuItems: MenuItem[] = [
    { id: 'dashboard', name: 'Dashboard', icon: 'dashboard' },
    { id: 'add-products', name: 'Add Products', icon: 'add_box' },
    { id: 'listing-center', name: 'Listing Center', icon: 'list' },
    { id: 'order-center', name: 'Order Center', icon: 'shopping_cart' },
    { id: '3pl-partner', name: '3PL Partner', icon: 'local_shipping' },
    { id: 'warehouses', name: 'Warehouses', icon: 'warehouse' },
    { id: 'withdrawal', name: 'Withdrawal', icon: 'account_balance_wallet' }
  ];

  toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.toggleCollapseEvent.emit(this.collapsed);
  }

  setActive(id: string) {
    this.activeItem = id;
  }
}
