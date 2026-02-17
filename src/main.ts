import { bootstrapApplication } from '@angular/platform-browser';
import { Routes, provideRouter, withHashLocation } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { App } from './app/app';

// Components
import { Signup } from './app/pages/signup/signup';
import { Login } from './app/pages/login/login';
import { HomePage } from './app/pages/Home/home-page/home-page';
import { About } from './app/pages/about/about';
import { News } from './app/pages/news/news';
import { Products } from './app/pages/products/products';
import { Profile } from './app/pages/profile/profile';
import { Cart } from './app/pages/cart/cart';
import { Orders } from './app/pages/order/order';
import { WishlistComponent } from './app/pages/wishlist/wishlist';
import { DataComponent } from './app/pages/data-cs/data-cs';
import { ItemManagerComponent } from './app/pages/item-manager.component/item-manager.component';

// Guard
import { authGuard } from './app/Auth/auth.guard';
import { Admin } from './app/pages/admin/admin';
import { Modal } from './app/pages/modal/modal';

const routes: Routes = [
  { path: '', redirectTo: 'HomePage', pathMatch: 'full' },
  { path: 'HomePage', component: HomePage },
  { path: 'Signup', component: Signup },
  { path: 'Login', component: Login },
  { path: 'About', component: About },

  // --- SHARED SECURE ROUTES (All roles) ---
  {
    path: 'News',
    component: News,
    canActivate: [authGuard],
    data: { roles: ['admin', 'farmer', 'customer'] }
  },
  {
    path: 'Profile',
    component: Profile,
    canActivate: [authGuard]
  },

  // --- CUSTOMER ROUTES ---
  {
    path: 'Products',
    component: Products,
    canActivate: [authGuard],
    data: { roles: ['farmer', 'customer', 'admin'] }
  },
  {
    path: 'Cart',
    component: Cart,
    canActivate: [authGuard],
    data: { roles: ['farmer', 'customer'] }
  },
  {
    path: 'Orders',
    component: Orders,
    canActivate: [authGuard],
    data: { roles: ['farmer', 'customer'] }
  },
  {
    path: 'WishlistComponent',
    component: WishlistComponent,
    canActivate: [authGuard],
    data: { roles: ['farmer', 'customer'] }
  },

  // --- FARMER ROUTES ---
  {
    path: 'ItemManagerComponent',
    component: ItemManagerComponent,
    canActivate: [authGuard],
    data: { roles: ['farmer', 'admin'] }
  },

  // --- ADMIN ROUTES ---
  {
    path: 'DataComponent',
    component: DataComponent,
    canActivate: [authGuard],
    data: { roles: ['farmer', 'admin'] }
  },
  {
    path: 'Modal',
    component: Modal,
    canActivate: [authGuard],
    data: { roles: ['farmer'] }
  },
  {
    path: 'admin/Admin',
    component: Admin,
    canActivate: [authGuard],
    data: { roles: ['admin'] }
  },
];

bootstrapApplication(App, {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideHttpClient()
  ]
}).catch(err => console.error(err));
