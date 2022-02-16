import { Component, OnInit } from '@angular/core';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { interval, noop, Observable, of, throwError, timer } from 'rxjs';
import { catchError, delay, delayWhen, filter, finalize, map, retryWhen, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { CourcesService } from '../services/cources.service';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor(
    private courcesService: CourcesService,
    private loadingService: LoadingService,
    private messageService: MessagesService
  ) {

  }

  ngOnInit() {
    this.reloadCources();
  }

  reloadCources() {
    const courses$ = this.courcesService.loadAllCources()
      .pipe(
        map(courses => courses.sort(sortCoursesBySeqNo)),
        catchError(err => {
          const message = "Could notn load courses";
          this.messageService.showErrors(message);
          console.log(err);
          return throwError(err);
        })
      );

    const loadcourses$ = this.loadingService.showLoaderUntilCompleted<Course[]>(courses$)

    this.beginnerCourses$ = loadcourses$.pipe(
      map(courses => courses.filter(course => course.category == "BEGINNER"))
    )

    this.advancedCourses$ = loadcourses$.pipe(
      map(courses => courses.filter(course => course.category == "ADVANCED"))
    )
  }


}




