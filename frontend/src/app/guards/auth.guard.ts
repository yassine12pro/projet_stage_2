import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = localStorage.getItem('User'); // Retrieve user object
    const token = user ? JSON.parse(user).token : null; // Extract token

    if (!token) {
      this.router.navigate(['/login']); // Redirect unauthorized users
      return false;
    }
    return true;
  }
}
