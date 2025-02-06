import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GET_ALL_REVIEW_URL, POST_REVIEW_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  

  constructor(private http: HttpClient) {}

  // Submit a review
  submitReview(rating: number, comment: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('User') || '{}'); // Get the user object from localStorage
    const token = user.token; // Extract the token from the user object

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    const reviewData = { rating, comment };

    return this.http.post(POST_REVIEW_URL, reviewData, { headers });
  }

  // Get all reviews
  getReviews(): Observable<any> {
    return this.http.get(GET_ALL_REVIEW_URL);
  }
}
