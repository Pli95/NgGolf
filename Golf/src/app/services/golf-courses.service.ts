import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Courses } from '../interfaces/courses';
import { Course } from '../interfaces/course';

@Injectable({
  providedIn: 'root'
})
export class GolfCoursesService {

  courseUrl = 'https://golf-courses-api.herokuapp.com/courses'

  constructor(
    private http: HttpClient
  ) { }

  getCourse(): Observable<Courses> {
    return this.http.get(this.courseUrl).pipe(
      map(courses => courses['courses'])
    )
  }

  getCourseById(courseId: string): Observable<Course> {
    return this.http.get(`https://golf-courses-api.herokuapp.com/courses/${courseId}`).pipe(
      map(data => data['data'])
    )
  }
}
