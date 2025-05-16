import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';

export const routes: Routes = [
    {path: "home", component: HomeComponent},
    {path: "courses", component: CoursesComponent},
    {path: "schedule", component: ScheduleComponent},
    {path: "", redirectTo: "home", pathMatch: "full"}
];
