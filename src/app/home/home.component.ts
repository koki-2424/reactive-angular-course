import { Component, OnInit } from '@angular/core';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { interval, noop, Observable, of, throwError, timer } from 'rxjs';
import { catchError, delay, delayWhen, filter, finalize, map, retryWhen, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { CourcesService } from '../services/cources.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  courses$: Observable<Course[]>;


  constructor(private courcesService: CourcesService) {

  }

  ngOnInit() {
    this.reloadCources();
  }

  reloadCources() {
    this.courses$ = this.courcesService.loadAllCources()
      .pipe(
        map(courses => courses.sort(sortCoursesBySeqNo))
      );

    this.beginnerCourses$ = this.courses$.pipe(
      map(courses => courses.filter(course => course.category == "BEGINNER"))
    )

    this.advancedCourses$ = this.courses$.pipe(
      map(courses => courses.filter(course => course.category == "ADVANCED"))
    )
  }


}




