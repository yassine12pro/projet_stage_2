import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/shared/models/Course';
@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.css']
})
export class CoursesPageComponent implements OnInit {

  courses: Course[] = [];
  constructor(private courseService: CourseService, activatedRoute: ActivatedRoute) {
    let coursesObservalbe:Observable<Course[]>;
    activatedRoute.params.subscribe((params) => {
      // if (params.searchTerm)
      //   coursesObservalbe = this.courseService.getAllcoursesBySearchTerm(params.searchTerm);
      // else if (params.tag)
      //   coursesObservalbe = this.courseService.getAllcoursesByTag(params.tag);
      // else
        coursesObservalbe = courseService.getAll();

        coursesObservalbe.subscribe((servercourses) => {
          this.courses = servercourses;
        })
    })
  }

  ngOnInit(): void {
  }

 

}
