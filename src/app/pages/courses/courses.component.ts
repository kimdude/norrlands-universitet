import { Component } from '@angular/core';
import { CourseTs } from '../../models/course.ts';
import { HttpClientService } from '../../services/http-client.service';
import { CommonModule, NgFor, NgIf, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScheduleService } from '../../services/schedule.service.js';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-courses',
  imports: [NgFor, NgIf, CommonModule, FormsModule, RouterLink],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  courses: CourseTs[] = [];
  filteredCourses: CourseTs[] = [];
  categories: string[] = [];
  newList: CourseTs[] = [];

  sortIcon: string = "sort_icon.svg";
  filterIcon: string = "filter_icon.svg";

  filterValue: string = "";
  subjectValue: string = "";
  indexLimit: number = 0;
  moreCourses: boolean = false;
  clicked: boolean = false;
  added: boolean = false;
  removed: boolean = false;
  mediumScreen: boolean = false;
  filterBtn: boolean = false;

  //Getting HTTP Client and Local storage
  constructor( private courseService: HttpClientService, private scheduleService: ScheduleService ) {};

  ngOnInit() {
    //Setting screen size
    this.getScreen();

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

    if(remainingCourses <= 10) {
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

    //Hiding filter
    this.clicked = false;
  }
  
  //Fetching already saved courses
  fetchCourses(): void {
    const savedList: CourseTs[] | null= this.scheduleService.getList("courseList");
    this.newList = savedList ?? [];

    //Compare newList to courses
    this.newList.forEach(course => {
      const index: number = this.courses.findIndex(originalCourse => originalCourse.courseCode === course.courseCode);
      if(index != -1) {
        this.courses[index].added = true;
      }
    })
  }

  //Adding to course list
  addCourse(course: CourseTs): void {
    const checkDuplette: number = this.newList.findIndex(oldCourse => oldCourse.courseCode === course.courseCode);

    if(checkDuplette === -1) {
      this.newList.push(course);

      this.saveList();
      this.fetchCourses();
    }

    //Display confirmation
    this.added = true;
    setTimeout(() => {
      this.added = false;
    }, 5000);
  }

  //Removing specific course
  removeCourse(code: string): void {
    const originalIndex: number = this.courses.findIndex(originalCourse => originalCourse.courseCode === code);
    this.courses[originalIndex].added =  false;

    const index: number = this.newList.findIndex(course => course.courseCode === code);
    this.newList.splice(index,1);

    this.saveList();

    //Display confirmation
    this.removed = true;
    setTimeout(() => {
      this.removed = false;
    }, 5000);
  }

  //Saving course list
  saveList(): void {
    this.scheduleService.setList("courseList", this.newList);
  }

  //Getting screen size
  getScreen(): void {
    const screenSize: number = window.innerWidth;

    if(screenSize < 800) {
      this.mediumScreen = true;
      this.filterBtn = true;
    } 
  }

  //Displaying filter menu
  displayFilters(): void {
    if(this.mediumScreen === false) {
      this.mediumScreen = true;
    } else {
      this.mediumScreen = false
    }
  }
} 
