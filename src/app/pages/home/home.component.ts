import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

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
}
