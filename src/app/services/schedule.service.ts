import { Injectable } from '@angular/core';
import { CourseTs } from '../models/course.ts';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor() { }

  //Saving courses
  setList(key: string, courseList: CourseTs[]): void {
    localStorage.setItem(key, JSON.stringify(courseList));
  }

  //Fetching courses
  getList(key: string): CourseTs[] | null {
    const value: string | null = localStorage.getItem(key);

    if(value === null) {
      return null;
    } else {
      return JSON.parse(value);
    }
  }

  //Remove all courses
  removeList(key: string): void {
    localStorage.removeItem(key);
  }
}
