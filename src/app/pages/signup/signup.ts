import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Auth/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup implements OnInit {
  private router = inject(Router);
  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  // Updated method to accept all form fields
  onRegister(name: string, email: string, phone: string, dob: string, address: string, bio: string, pass: string) {

    // Simple Validation
    if (!name.trim() || !email.trim() || !pass.trim()) {
      alert('Name, Email, and Password are required for FarmEase registration.');
      return;
    }

    // 1. Get existing users
    const users = JSON.parse(localStorage.getItem('User') || '[]');

    // 2. Check for duplicate email
    const exists = users.find((u: any) => u.email === email.trim());
    if (exists) {
      alert('This email is already registered with FarmEase.');
      return;
    }

    // 3. Create full Farmer profile object
    const newFarmer = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      dob: dob,
      address: address.trim(),
      bio: bio.trim(),
      password: pass.trim(),
      joinedDate: new Date().toLocaleDateString()
    };

    // 4. Save to localStorage
    users.push(newFarmer);
    localStorage.setItem('User', JSON.stringify(users));

    alert('Welcome to the FarmEase family! Please login to continue.');

    // 5. Navigate to Login
    this.router.navigate(['/Login']);
  }
}
