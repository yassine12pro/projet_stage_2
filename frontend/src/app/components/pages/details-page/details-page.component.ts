import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../../services/course.service'; // Adaptez le chemin selon votre projet
import { Course } from '../../../shared/models/Course'; // Modifiez le chemin et le modèle selon votre projet
import { CartService } from 'src/app/services/cart.service';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css'] // Si vous avez des styles spécifiques
})
export class DetailsPageComponent implements OnInit {
  course!: Course; // Utilisez le type de données correspondant à votre modèle
  loading: boolean = true;
  error: string = '';
  user!:User

  courses: Course[] = [];
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,private cartService:CartService,private router:Router,
    activatedRoute: ActivatedRoute,private userService:UserService
  ) {

    let coursesObservalbe:Observable<Course[]>;
        activatedRoute.params.subscribe((params) => {
          const currentCourseId = params['id'];
        
          this.courseService.getAll().subscribe((serverCourses) => {
            this.courses = serverCourses.filter(
              (course) => course.id !== currentCourseId
            ); // Filtrer les cours
          });


        })
  }

  // ngOnInit(): void {
  //   const courseId = this.route.snapshot.paramMap.get('id'); // Récupère l'ID depuis l'URL
  //   if (courseId) {
  //     this.courseService.getCourseById(courseId).subscribe({
  //       next: (course) => {
  //         this.course = course;
  //         this.loading = false;
  //       },
  //       error: (err) => {
  //         this.error = 'Erreur lors du chargement des détails du cours.';
  //         this.loading = false;
  //       }
  //     });
  //   } else {
  //     this.error = 'ID du cours non fourni.';
  //     this.loading = false;
  //   }
  // }

  ngOnInit(): void {
    // Subscribe to changes in the route parameter (course id)
    this.route.paramMap.subscribe((params) => {
      const courseId = params.get('id');
      if (courseId) {
        this.getCourseDetails(courseId); // Fetch course details based on the courseId
      }
    });

    this.user=this.userService.currentUser
  }

  getCourseDetails(courseId: string): void {
    this.loading = true;
    this.courseService.getCourseById(courseId).subscribe({
      next: (course) => {
        this.course = course;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading course details.';
        this.loading = false;
      },
    });
  }

  
  addToCart(){
    this.cartService.addToCart(this.course)
    this.router.navigateByUrl("/cart-page")
  }
}
