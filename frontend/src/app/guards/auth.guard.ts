import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = localStorage.getItem('User'); 
    const token = user ? JSON.parse(user).token : null; 

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
