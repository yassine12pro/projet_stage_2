import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../../services/review.service';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-avis-page',
  templateUrl: './avis-page.component.html',
  styleUrls: ['./avis-page.component.css'],
})
export class AvisPageComponent implements OnInit {
  rating: number = 0; // Store rating
  comment: string = ''; // Store comment
  reviews: any[] = []; // Store reviews
  currentUser!:string;

  constructor(private reviewService: ReviewService,private userService:UserService) {}

  ngOnInit(): void {
    // Fetch existing reviews when the component is initialized
    this.loadReviews();
    this.currentUser=this.userService.currentUser.name
  }
  
  

  submitReview(): void {
    const userId = JSON.parse(localStorage.getItem('User') || '{}').id; // Get user ID from localStorage

    if (!userId) {
      alert('You must be logged in to leave a review.');
      return;
    }

    // Check if the user already submitted a review
    this.reviewService.getReviews().subscribe((reviews: any) => {
      const existingReview = reviews.find(
        (review: any) => review.userId._id === userId
      );

      if (existingReview) {
        Swal.fire({
          position: 'bottom-end',
          icon: 'error',
          title: 'Already leave a review',
          text: 'You are already leave a reviw , you can t leave more than one review !',
          timer: 3000,
          showConfirmButton: false,
          width: '400px',
        });
        return;
      }

      // Proceed with submitting the review
      const review = {
        rating: this.rating,
        comment: this.comment,
      };

      this.reviewService.submitReview(review.rating, review.comment).subscribe(
        (response) => {
          console.log('Review added successfully', response);
          // Reset form after submission
          this.rating = 0;
          this.comment = '';
          this.loadReviews(); // Reload reviews after submission
        },
        (error) => {
          console.error('Error submitting review:', error);
        }
      );
    });
  }

  loadReviews(): void {
    // Fetch all reviews from the backend
    this.reviewService.getReviews().subscribe(
      (reviews) => {
        this.reviews = reviews;
      },
      (error) => {
        console.error('Error fetching reviews:', error);
      }
    );
  }
}
