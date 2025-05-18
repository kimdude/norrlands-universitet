import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  smallScreen: boolean = false;
  closeBtn: boolean = false;

  ngOnInit(){
    this.getScreen();
  }

  //Getting screen size
  getScreen(): void {
    const screenSize: number = window.innerWidth;

    if(screenSize < 640) {
      this.smallScreen = true;
      this.closeBtn = true;
    }
  }

  displayMenu(): void {
    if(this.smallScreen === false) {
      this.smallScreen = true;
    } else {
      this.smallScreen = false;
      this.closeBtn = true;
    }
  }
}
