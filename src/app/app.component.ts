import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavigationComponent } from "./partials/navigation/navigation.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  logo = "fullLogo.svg";
  fb = "fbIcon.svg";
  ig = "igLogo.svg";
  title = 'norrlands-universitet';
}
