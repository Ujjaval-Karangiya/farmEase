import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getCurrentUser() {
      throw new Error('Method not implemented.');
  }
  user$: any;

  login() {
    localStorage.setItem('token', 'abc123');
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}


