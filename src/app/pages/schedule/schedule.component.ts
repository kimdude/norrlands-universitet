import { ChangeDetectorRef, Component } from '@angular/core';
import { SavedCoursesComponent } from "../../partials/saved-courses/saved-courses.component";

@Component({
  selector: 'app-schedule',
  imports: [SavedCoursesComponent],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent {
  constructor(private cd: ChangeDetectorRef) {}

  courses: number = 0;
  totalPoints: number = 0;
  thisPage: string = "coursePage";

  countTotals(totals: { points: number, courseCount: number }): void {
    this.courses = totals.courseCount;
    this.totalPoints = totals.points;

    //Detecting changes
    this.cd.detectChanges();
  }
}
