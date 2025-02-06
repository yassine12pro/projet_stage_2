import { Injectable } from '@angular/core';
import {  BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { User } from '../shared/models/User';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
// declare const Swal: any;
   

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserToLocalStorage());
  public userObservable: Observable<User>;

  constructor(private http: HttpClient,private router: Router) {
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUser(): User {
    return this.userSubject.value;
  }

  public get currentUserId(): string {
    return this.currentUser.id; // Assurez-vous que `User` a une propriété `id`
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: 'Login Successful',
            text: 'Welcome back!',
            timer: 3000,
            showConfirmButton: false,
            width: '400px',
          });
        },
        error: (errorResponse) => {
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Invalid credentials. Please try again.',
          });
        },
      })
    );
  }

  register(userRegister: IUserRegister): Observable<User> {
    return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: 'Register Successful',
            text: 'You are Welcome!',
            timer: 3000,
            showConfirmButton: false,
            width: '400px',
          });
        },
        error: (errorResponse) => {
          Swal.fire({
            icon: 'error',
            title: 'Register Failed',
            text: 'Invalid credentials. Please try again.',
          });
        },
      })
    );
  }

  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem('User');
    this.router.navigate(['/login']); 
    
  }

  private setUserToLocalStorage(user: User) {
    localStorage.setItem('User', JSON.stringify(user));
  }

  private getUserToLocalStorage(): User {
    const userJson = localStorage.getItem('User');
    if (userJson) return JSON.parse(userJson) as User;
    return new User();
  }
}