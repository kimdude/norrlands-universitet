import { Component } from '@angular/core';
import { CourseTs } from '../../models/course.ts';
import { HttpClientService } from '../../services/http-client.service';
import { CommonModule, NgFor, NgIf, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-courses',
  imports: [NgFor, NgIf, CommonModule, FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  courses: CourseTs[] = [];
  filteredCourses: CourseTs[] = [];
  categories: string[] = [];
  points: number[] = [];

  filterValue: string = "";
  indexLimit: number = 10;
  moreCourses: boolean = true;

  constructor( private courseService: HttpClientService ) {};

  ngOnInit() {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
      this.filteredCourses = data;
      this.sortCourses();
    })
  }

  //Loading more courses
  loadMore(): void {
    const newLimit: number = this.indexLimit + 10;
    this.indexLimit = newLimit;

    if(this.indexLimit >= this.courses.length) {
      this.moreCourses = false;
    } else {
      this.moreCourses = true;
    }
  }

  sortCourses(): void {
    //Sorting categories
    const allCategories: string[] = this.courses.map((course) => {
      return course.subject
    });

    const sortedCourses: string[] = allCategories.filter((category, index) => allCategories.indexOf(category) === index);
    this.categories = sortedCourses;

    //Sorting points  
    const allPoints: number[] = this.courses.map((course) => {
      return course.points
    });

    const sortedPoints: number[] = allPoints.filter((category, index) => allPoints.indexOf(category) === index);
    const orgPoints: number[] = sortedPoints.sort((a,b) => a -b)
    this.points = orgPoints;
  }

  filterSearch(): void {
    this.filteredCourses = this.courses.filter((course) =>
      course.courseName.toLowerCase().includes(this.filterValue.toLocaleLowerCase())
    )
  }

}
