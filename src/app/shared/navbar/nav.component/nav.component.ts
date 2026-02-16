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
  
  // Inject services
  constructor(public auth: AuthService) { }
  private router = inject(Router);
  
  ngOnInit(): void {
    // 1. Check if user is logged in
    // Removed the automatic redirect to home, as this would 
    // prevent users from accessing private routes like /News
  }

  // Method to handle logout and redirect
  logout(): void {
    this.auth.logout(); // Call logout method from service
    this.router.navigate(['/']); // Redirect to home
  }
}