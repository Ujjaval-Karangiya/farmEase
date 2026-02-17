import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService, UserRole } from '../../Auth/auth.service';


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

  onRegister(
    name: string,
    email: string,
    phone: string,
    dob: string,
    address: string,
    bio: string,
    pass: string,
    roleValue: string   // 👈 accept string
  ) {

    const role = roleValue as UserRole;  // 👈 cast here safely


    // 1️⃣ Basic Validation
    if (!name.trim() || !email.trim() || !pass.trim()) {
      alert('Name, Email, and Password are required for FarmEase registration.');
      return;
    }

    // 2️⃣ Get existing users
    const users = JSON.parse(localStorage.getItem('Users') || '[]');

    // 3️⃣ Check duplicate email
    const exists = users.find((u: any) => u.email === email.trim());
    if (exists) {
      alert('This email is already registered with FarmEase.');
      return;
    }

    // 4️⃣ Create new user object
    const newUser = {
      id: `usr-${Date.now()}`,
      fullName: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      birthDate: dob,
      address: address.trim(),
      bio: bio.trim(),
      password: pass.trim(),
      role: role,
      joinedDate: new Date().toLocaleDateString()
    };

    // 5️⃣ Save to localStorage
    users.push(newUser);
    localStorage.setItem('Users', JSON.stringify(users));

    console.log('Registered New User:', newUser);

  

    // 7️⃣ Redirect by role
    this.redirectByRole(role);
  }

  private redirectByRole(role: string) {
    if (role === 'farmer') {
      this.router.navigate(['/Login']);
    } else if (role === 'customer') {
      this.router.navigate(['/Login']);
    } else if (role === 'admin') {
      this.router.navigate(['/Login']);
    } else {
      this.router.navigate(['/Login']);
    }
  }
}
