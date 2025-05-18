import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CourseTs } from '../../models/course.ts';
import { HttpClientService } from '../../services/http-client.service';
import { NgFor, NgIf } from '@angular/common';
import { SavedCoursesComponent } from "../../partials/saved-courses/saved-courses.component";

@Component({
  selector: 'app-home',
  imports: [RouterLink, NgIf, NgFor, SavedCoursesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  bigLogo: string = "fullLogo_red.svg";
  bookIcon: string = "book_icon.svg";
  personIcon: string = "person_icon.svg";
  thisPage: string = "homePage";

  courses: CourseTs[] = [];
  categories: string[] = [];

  constructor( private courseService: HttpClientService ) {};

  ngOnInit() {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data;

      this.sortCourses();
    })
  }

  //Getting categories
  sortCourses(): void {
    //Sorting categories
    const allCategories: string[] = this.courses.map((course) => {
      return course.subject
    });

    const sortedCourses: string[] = allCategories.filter((category, index) => allCategories.indexOf(category) === index);
    this.categories = sortedCourses;
  }
}
