import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { GolfCoursesService } from './services/golf-courses.service';
import { IsLoadingService } from '@service-work/is-loading';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { filter } from 'rxjs/operators';
import { title } from 'process';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoading: Observable<boolean>

  constructor(
    private isLoadingService: IsLoadingService,
    private router: Router
  ) { }

  ngOnInit() {

    this.isLoading = this.isLoadingService.isLoading$();

    this.router.events
      .pipe(
        filter(event =>
          event instanceof NavigationStart ||
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError
        ),
      ).subscribe(event => {
        if (event instanceof NavigationStart) {
          this.isLoadingService.add()
          return
        }
        this.isLoadingService.remove()
      })
  }

  title = 'Golf';
}
