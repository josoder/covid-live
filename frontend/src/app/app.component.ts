import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  sideBarOpened = false;

  toggleSideBar($event: any) {
    this.sideBarOpened = !this.sideBarOpened;
  }
}
