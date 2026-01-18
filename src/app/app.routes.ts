import { Routes } from '@angular/router';

import { Dashboard } from './pages/dashboard/dashboard';
import { Category } from './pages/category/category';
import { Products } from './pages/products/products';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'dashboard', component: Dashboard },
  { path: 'category', component: Category },
  { path: 'products', component: Products},
  // { path: 'listing-center', component: ListingCenterComponent },
  // { path: 'order-center', component: OrderCenterComponent },
  // { path: '3pl-partner', component: Partner3plComponent },
  // { path: 'warehouses', component: WarehousesComponent },
  // { path: 'withdrawal', component: WithdrawalComponent }
];
