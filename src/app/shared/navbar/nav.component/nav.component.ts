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
  // Use null initially so *ngIf works correctly in HTML
  currentUser: any = null;

  constructor(public auth: AuthService) { }
  private router = inject(Router);

  ngOnInit(): void {
    // 1. Get the raw string from localStorage
    const storedData = localStorage.getItem("CurrentUser");

    // 2. Parse it only once
    if (storedData) {
      try {
        this.currentUser = JSON.parse(storedData);
        console.log("FarmEase User Loaded:", this.currentUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }

  logout(): void {
    localStorage.removeItem("CurrentUser"); // Ensure storage is cleared
    this.auth.logout();
    this.currentUser = null;
    this.router.navigate(['/']);
  }

}
