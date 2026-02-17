import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  auth = inject(AuthService);
  router = inject(Router);

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/']);
      return;
    }
  }

  login(email: string, password: string) {

    email = email.trim();
    password = password.trim();

    if (!email || !password) {
      alert('Please enter email and password');
      return;
    }

    // ✅ FIXED KEY
    const users = JSON.parse(
      localStorage.getItem('Users') ||
      '[{"address":"Dwarka","bio":"hfdgfddfg","birthDate":"","email":"ujjaval@gmail.com","fullName":"ujjaval demo","id":"usr-1771310855975","joinedDate":"17/02/2026","password":"7410","phone":"8520852020","role":"admin"}]'
    );



    const foundUser = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (!foundUser) {
      alert('Invalid email or password');
      return;
    }

    // Save current logged in user
    localStorage.setItem('CurrentUser', JSON.stringify(foundUser));

    // ✅ Pass role if required
    this.auth.login(foundUser.role);

    // Optional: Redirect by role
    this.redirectByRole(foundUser.role);
  }

  private redirectByRole(role: string) {
    if (role === 'farmer') {
      this.router.navigate(['/']);
    } else if (role === 'customer') {
      this.router.navigate(['/']);
    } else if (role === 'admin') {
      this.router.navigate(['/admin/Admin']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
