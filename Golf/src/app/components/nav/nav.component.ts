import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { GolfCoursesService } from 'src/app/services/golf-courses.service';
import { Courses } from 'src/app/interfaces/courses';
import { IsLoadingService } from '@service-work/is-loading';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  courses: any;
  tees: any[];
  panelOpenState = false;

  constructor(
    private courseService: GolfCoursesService,
    private isLoadingService: IsLoadingService,
    private router: Router
  ) { }

  ngOnInit(): void {

    combineLatest([
      this.courseService.getCourse(),
    ]).subscribe( data => {
      this.courses = data[0]
    })
  }

  openPannel(id) {
    if (this.panelOpenState = true) {
      this.courseService.getCourseById(id).subscribe(courseData => {
        this.tees = courseData.holes[0].teeBoxes
      })
    }
  }

  reRoute(navId, teeType) {
    this.router.navigate(['/courses',navId, teeType])
    .then(_ => window.location.reload())
    
  }

}
