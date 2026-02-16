import { bootstrapApplication } from '@angular/platform-browser';
import { Routes, provideRouter, withHashLocation } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // 1. Import this
import { App } from './app/app';
import { Signup } from './app/pages/signup/signup';
import { Login } from './app/pages/login/login';
import { HomePage } from './app/pages/Home/home-page/home-page';
import { About } from './app/pages/about/about';
import { News } from './app/pages/news/news';
import { authGuard } from './app/Auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'HomePage', pathMatch: 'full' },
  { path: '', component: HomePage }, 
    { path: 'Signup', component: Signup },
    { path: 'Login', component: Login  },
  { path: 'About', component: About },
    { path: 'News', component: News, canActivate: [authGuard] },
];

/* App configuration */
const appConfig = {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideHttpClient() // 2. Add this here!
  ]
};

bootstrapApplication(App, appConfig)
  .catch(err => console.error('Bootstrap error:', err));
