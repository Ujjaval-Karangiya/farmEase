import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../../Auth/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  currentUser: any = null;
  private router = inject(Router);
  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    const storedData = localStorage.getItem("CurrentUser");
    if (storedData) {
      this.currentUser = JSON.parse(storedData);
    }
  }

  // Helper to check roles
  hasRole(role: string): boolean {
    return this.currentUser?.role === role;
  }

  logout(): void {
    localStorage.removeItem("CurrentUser");
    this.auth.logout();
    this.currentUser = null;
    this.router.navigate(['/Login']);
  }
}
