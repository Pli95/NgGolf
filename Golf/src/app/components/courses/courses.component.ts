import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { GolfCoursesService } from 'src/app/services/golf-courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses: any

  constructor(
    private courseService: GolfCoursesService
  ) { }

  ngOnInit(): void {
    combineLatest([
      this.courseService.getCourse(),
    ]).subscribe( data => {
      this.courses = data[0]
    })
  }

}
