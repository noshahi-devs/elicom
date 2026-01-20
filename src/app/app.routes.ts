import { Routes } from '@angular/router';

import { Dashboard } from './pages/dashboard/dashboard';
import { Category } from './pages/category/category';
import { Products } from './pages/products/products';
import { OrderCenter } from './pages/order-center/order-center';
import { Partner3pl } from './pages/partner-3pl/partner-3pl';
import { Warehouses } from './pages/warehouses/warehouses';
import { Withdrawal } from './pages/withdrawal/withdrawal';
import { Orders } from './pages/orders/orders';
import { Users } from './pages/users/users';
import { Settings } from './pages/settings/settings';
import { OrderItems } from './pages/order-items/order-items';
import { UserAddresses } from './pages/user-addresses/user-addresses';
import { ProductVariants } from './pages/product-variants/product-variants';
import { ProductImages } from './pages/product-images/product-images';
import { Wishlists } from './pages/wishlists/wishlists';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'dashboard', component: Dashboard },
  { path: 'category', component: Category },
  { path: 'products', component: Products},
  { path: 'orders', component: Orders },
  { path: 'order-items', component: OrderItems },
  { path: 'users', component: Users },
  { path: 'user-addresses', component: UserAddresses },
  { path: 'settings', component: Settings },
  { path: 'product-variants', component: ProductVariants },
  { path: 'product-images', component: ProductImages },
  { path: 'wishlists', component: Wishlists },
  { path: 'order-center', component: OrderCenter },
  { path: '3pl-partner', component: Partner3pl },
  { path: 'warehouses', component: Warehouses },
  { path: 'withdrawal', component: Withdrawal }
];
