import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../shared/models/Course';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  searchTerm: string = '';
  newCourse: Course = {
    id: '',
    name: '',
    description: '',
    price: 0,
    stars: 0,
    imageUrl: '',
    duration: 0,
  };
  selectedCourse: Course | null = null;
  showAddForm: boolean = false;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getAll().subscribe((data) => {
      this.courses = data;
      this.filteredCourses = data; // Initialiser les cours filtrés
    });
  }

  searchCourses(): void {
    if (this.searchTerm) {
      this.filteredCourses = this.courses.filter((course) =>
        course.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredCourses = this.courses;
    }
  }

  addCourse(): void {
    this.courseService.addCourse(this.newCourse).subscribe(() => {
      this.loadCourses();
      this.resetNewCourse();
      this.showAddForm = false;
    });
  }

  editCourse(course: Course): void {
    this.selectedCourse = { ...course };
    
  }

  updateCourse(): void {
    if (this.selectedCourse && this.selectedCourse.id) {

      this.courseService.updateCourse(this.selectedCourse.id, this.selectedCourse).subscribe(() => {
        this.loadCourses();
        this.selectedCourse = null;
      });
    }
  }

  deleteCourse(id: string): void {
    this.courseService.deleteCourse(id).subscribe(() => this.loadCourses());
  }


  resetNewCourse(): void {
    this.newCourse = {
      id: '',
      name: '',
      description: '',
      price: 0,
      stars: 0,
      imageUrl: '',
      duration: 0,
    };
  }
}