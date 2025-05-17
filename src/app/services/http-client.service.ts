import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseTs } from '../models/course.ts';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  private url: string = 'https://matdah.github.io/DT208G---Programmering-i-TypeScript/Moment%205%20-%20Projekt/miun_courses.json';

  constructor(private http: HttpClient) { }

  getCourses(): Observable<CourseTs[]> {
    return this.http.get<CourseTs[]>(this.url);
  }
}
