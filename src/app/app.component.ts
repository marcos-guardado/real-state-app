import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { IUser } from './interfaces/user.interface';
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
  constructor(userService: UserService) {
    userService.getUser().subscribe((user: IUser) => {
      this.isUserLogged = Object.keys(user).length > 0;
    });
  }
}
