import { Injectable } from '@angular/core';
import { Course } from '../shared/models/Course';
import { CartItem } from '../shared/models/CartItem';
import { Cart } from '../shared/models/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  constructor(private userService: UserService ,private router: Router) {
    // Écouter les changements de l'utilisateur pour mettre à jour le panier
    this.userService.userObservable.subscribe((user) => {
      this.cart = this.getCartFromLocalStorage();
      this.cartSubject.next(this.cart);
    });
  }

  addToCart(course: Course): void {
    if (!this.userService.currentUserId) {
      // Redirect to login page if not authenticated
      this.router.navigateByUrl("/login");
      
    }else{
      let cartItem = this.cart.items.find(item => item.course.id == course.id);
      if (cartItem)
        return;
      this.cart.items.push(new CartItem(course));
      this.setCartToLocalStorage();
    }

   
  }

  removeFromCart(courseId: string): void {
    this.cart.items = this.cart.items.filter(item => item.course.id != courseId);
    this.setCartToLocalStorage();
  }

  clearCart(): void {
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  getCart(): Cart {
    return this.cartSubject.value;
  }

  private setCartToLocalStorage(): void {
    this.cart.totalPrice = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);
    this.cart.totalCount = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);

    const cartJson = JSON.stringify(this.cart);
    const userId = this.userService.currentUser.id;
    localStorage.setItem(`Cart_${userId}`, cartJson);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): Cart {
    const userId = this.userService.currentUser.id;
    const cartJson = localStorage.getItem(`Cart_${userId}`);
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }
}