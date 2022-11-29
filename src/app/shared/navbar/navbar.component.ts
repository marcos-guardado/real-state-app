import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { IUser } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import { validateUserRol } from 'src/app/utils/validateRol';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  items!: MenuItem[];
  user!: IUser;
  constructor(userService: UserService) {
    userService.getUser().subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/home',
      },
      {
        label: 'Add Property',
        icon: 'pi pi-plus-circle',
        routerLink: '/add-property',
        visible: validateUserRol(this.user, 'seller'),
      },
      {
        label: 'Saved Properties',
        icon: 'pi pi-bookmark-fill',
        visible: validateUserRol(this.user, 'seller'),
      },
    ];
  }
}
