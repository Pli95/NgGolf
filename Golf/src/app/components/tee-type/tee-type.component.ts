import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GolfCoursesService } from 'src/app/services/golf-courses.service';
import { switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Courses } from 'src/app/interfaces/courses';
import { Course } from 'src/app/interfaces/course';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tee-type',
  templateUrl: './tee-type.component.html',
  styleUrls: ['./tee-type.component.scss']
})
export class TeeTypeComponent implements OnInit {
  tees: any[]
  course: any

  constructor(
    private route: ActivatedRoute,
    private courseService: GolfCoursesService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        return this.courseService.getCourseById(params.id)
      }),
      tap(course => {
        this.tees = course.holes[0].teeBoxes
        this.course = course
        // console.log(this.tees)
      })
    ).subscribe();
  }

  goBack() {
    this.location.back()
  }

}
