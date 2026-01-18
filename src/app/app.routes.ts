import { Routes } from '@angular/router';

import { Dashboard } from './pages/dashboard/dashboard';
import { Category } from './pages/category/category';

export const routes: Routes = [
  { path: 'dashboard', component: Dashboard },
  { path: 'category', component: Category },
  // { path: 'listing-center', component: ListingCenterComponent },
  // { path: 'order-center', component: OrderCenterComponent },
  // { path: '3pl-partner', component: Partner3plComponent },
  // { path: 'warehouses', component: WarehousesComponent },
  // { path: 'withdrawal', component: WithdrawalComponent }
];
