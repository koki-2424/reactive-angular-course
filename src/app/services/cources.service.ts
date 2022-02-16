import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { Course, sortCoursesBySeqNo } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CourcesService {
  constructor(private http: HttpClient) {

  }

  loadAllCources(): Observable<Course[]> {
    return this.http.get<Course[]>("/api/courses")
      .pipe(
        map(res => res["payload"]),
        shareReplay()
      );
  }

  saveCource(courceId: string, changes: Partial<Course>):Observable<any>{
    return this.http.put(`/api/courses/${courceId}`, changes)
    .pipe(
      shareReplay()
    )
  }
}
