import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Auth/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile implements OnInit {
  currentUser: any = null;
  private router = inject(Router);
  private auth = inject(AuthService);

  ngOnInit(): void {
    const storedUser = localStorage.getItem('CurrentUser');

    if (!storedUser) {
      this.router.navigate(['/login']);
      return;
    }

    try {
      this.currentUser = JSON.parse(storedUser);
    } catch (error) {
      console.error('Invalid user data', error);
      this.router.navigate(['/login']);
    }
  }

  editProfile(): void {
    console.log('Edit profile clicked');
    // Add your edit logic here
  }

}
