import { Component } from '@angular/core';
import { CourseTs } from '../../models/course.ts';
import { HttpClientService } from '../../services/http-client.service';
import { CommonModule, NgFor, NgIf, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScheduleService } from '../../services/schedule.service.js';

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
  newList: CourseTs[] = [];

  sortIcon: string = "sort_icon.svg"

  filterValue: string = "";
  subjectValue: string = "";
  indexLimit: number = 0;
  moreCourses: boolean = false;
  clicked: boolean = false;

  //Getting HTTP Client and Local storage
  constructor( private courseService: HttpClientService, private scheduleService: ScheduleService ) {};

  ngOnInit() {
    //Fetching courses
    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
      this.filteredCourses = data;
      this.sortCourses();
      this.loadMore()

      //Setting default values for inputs
      const subjectDefault: string = this.categories[0];
      this.subjectValue = subjectDefault;

      this.fetchCourses();
    })
  }

  //Loading more courses
  loadMore(): void {
    const remainingCourses = this.filteredCourses.length - this.indexLimit;

    if(remainingCourses < 10) {
      const newLimit: number = this.indexLimit + remainingCourses;
      this.indexLimit = newLimit;

      this.moreCourses = false;

    } else {
      const newLimit: number = this.indexLimit + 10;
      this.indexLimit = newLimit;

      this.moreCourses = true;
    }
  }

  //Sorting courses
  sortCourses(): void {
    //Sorting categories
    const allCategories: string[] = this.courses.map((course) => {
      return course.subject
    });

    const sortedCourses: string[] = allCategories.filter((category, index) => allCategories.indexOf(category) === index);
    this.categories = sortedCourses;
  }

  //Filtering by search phrase
  filterSearch(): void {
    this.filteredCourses = this.courses.filter((course) =>
      course.courseName.toLowerCase().includes(this.filterValue.toLocaleLowerCase()) || course.courseCode.toLowerCase().includes(this.filterValue.toLocaleLowerCase())
    );

    //Reseting displayed articles per search
    this.indexLimit = 0;
    this.loadMore();
  }

  //Filtering by subject
  filterSubject(): void {
    this.filteredCourses = this.courses.filter((course) =>
      course.subject.includes(this.subjectValue)
    );

    //Reseting displayed articles per search
    this.indexLimit = 0;
    this.loadMore();
  }

  //Displaying sort options
  displaySort(): void {
    if(this.clicked === false) {
      this.clicked = true;
    } else {
      this.clicked = false;
    }
  }

  //Sorting courses
  sortList(e: Event): void {
    const target = e.target as HTMLElement;
    const sortBy: string | null = target.textContent;

    if(sortBy === "Kursnamn") {
      //Sorting by cours name
      this.filteredCourses.sort((a,b) => {
        if(a.courseName > b.courseName) {
          return 1;
        } if(a.courseName < b.courseName) {
          return -1;
        } else {
          return 0;
        }
      })
      
    } else if(sortBy === "Ämne") {
      //Sorting by subject
      this.filteredCourses.sort((a,b) => {
        if(a.subject > b.subject) {
          return 1;
        } if(a.subject < b.subject) {
          return -1;
        } else {
          return 0;
        }
      })

    } else if(sortBy === "Kurskod") {
      //Sorting by cours code
      this.filteredCourses.sort((a,b) => {
        if(a.courseCode > b.courseCode) {
          return 1;
        } if(a.courseCode < b.courseCode) {
          return -1;
        } else {
          return 0;
        }
      })

    } else {
      //Sorting by points
      this.filteredCourses.sort((a,b) => {
        if(a.points > b.points) {
          return 1;
        } if(a.points < b.points) {
          return -1;
        } else {
          return 0;
        }
      })
    }
  }
  
  //Fetching already saved courses
  fetchCourses(): void {
    const savedList: CourseTs[] | null= this.scheduleService.getList("courseList");
    this.newList = savedList ?? [];
  }

  //Adding to course list
  addCourse(course: CourseTs): void {
    const checkDuplette: number = this.newList.findIndex(oldCourse => oldCourse.courseCode === course.courseCode);

    if(checkDuplette === -1) {
      this.newList.push(course);
      this.saveList();
      this.fetchCourses();
    } else {
      
      /**
       * Skriv ut något till skärmen
       */
    }
  }

  //Saving course list
  saveList(): void {
    this.scheduleService.setList("courseList", this.newList);
  }
} 
