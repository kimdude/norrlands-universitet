import { Component } from '@angular/core';
import { CourseTs } from '../../models/course.ts';
import { ScheduleService } from '../../services/schedule.service';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-schedule',
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent {
  points: number = 0;
  list: CourseTs[] = [];

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit() {
    this.fetchList();
  }

  //Fetching course list
  fetchList(): void {
    const savedList: CourseTs[] | null= this.scheduleService.getList("courseList");
    this.list = savedList ?? [];
    this.countPoints();
  }

  //Saving course list
  saveList(): void {
    this.scheduleService.setList("courseList", this.list);
  }

  //Removing specific course
  removeCourse(code: string): void {
    const index: number = this.list.findIndex(course => course.courseCode === code);
    this.list.splice(index,1);

    this.saveList();
  }

  //Removing course list
  removeList(): void {
    this.scheduleService.removeList("courseList");
    this.fetchList();
  }

  //Counting total points
  countPoints(): void {
    const allPoints: number[] = this.list.map(course => course.points);
    const totalSum: number = allPoints.reduce((accumulator, a) => accumulator + a, 0);

    this.points = totalSum;
  }
 
}
