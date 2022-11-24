import { Component, OnInit } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { IProperty } from 'src/app/interfaces/property.interface';
import { PropertiesService } from 'src/app/services/properties.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: any;
  houses!: IProperty[];
  constructor(
    private userService: UserService,
    private propertiesService: PropertiesService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.propertiesService
      .getProperties()
      .subscribe((properties: DocumentData) => {
        this.houses = [...(properties as IProperty[])];
      });
  }
}
