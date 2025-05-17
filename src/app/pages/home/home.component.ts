import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CourseTs } from '../../models/course.ts';
import { HttpClientService } from '../../services/http-client.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  bigLogo = "fullLogo_red.svg";
  bookIcon = "book_icon.svg";
  personIcon = "person_icon.svg";

  courses: CourseTs[] = [];

  constructor( private courseService: HttpClientService ) {};

  ngOnInit() {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
    })
  }

}
