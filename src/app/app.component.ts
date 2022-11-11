import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'real-state-app';
  isUserLogged: boolean = false;
  user$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  constructor(private userService: UserService, private router: Router) {
    this.isUserLogged = Object.keys(userService.getUser()).length > 0;
  }
}
