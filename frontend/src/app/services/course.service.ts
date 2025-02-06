import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../shared/models/Course';
import { DELETE_COURSE_URL, GET_ALL_COURSES_URL, GET_Course_BY_ID_URL, POST_COURSE_URL, PUT_COURSE_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http:HttpClient) { }

  getAll(): Observable<Course[]> {
    return this.http.get<Course[]>(GET_ALL_COURSES_URL);
  }

  // getAllCoursesBySearchTerm(searchTerm: string) {
  //   return this.http.get<Course[]>(CourseS_BY_SEARCH_URL + searchTerm);
  // }


  getCourseById(CourseId:string):Observable<Course>{
    return this.http.get<Course>(GET_Course_BY_ID_URL + CourseId);
  }
  // hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh

  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(POST_COURSE_URL, course);
  }

  updateCourse(id: string, course: Course): Observable<Course> {
    return this.http.put<Course>(`${PUT_COURSE_URL}/${id}`, course);
  }
  deleteCourse(id: string): Observable<void> {
    return this.http.delete<void>(`${DELETE_COURSE_URL}/${id}`);
  }

}