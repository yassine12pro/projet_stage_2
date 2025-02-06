import { Component, OnInit } from '@angular/core';
import { ReviewService } from 'src/app/services/review.service';
import { UserService } from 'src/app/services/user.service';
import { Review } from 'src/app/shared/models/Review';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  reviews: Review[] = []; // Initialize the reviews array
  currentUser!:string;
  constructor(private reviewService: ReviewService ,private userService:UserService) { }

  ngOnInit(): void {
    // Fetch reviews when the component is initialized
    this.loadReviews();
    this.currentUser=this.userService.currentUser.name
  }

  loadReviews(): void {
    // Call the ReviewService to get reviews
    this.reviewService.getReviews().subscribe(
      (reviews: Review[]) => {
        this.reviews = reviews; // Assign the fetched reviews to the reviews array
      },
      (error) => {
        console.error('Error fetching reviews:', error);
      }
    );
  }
}
