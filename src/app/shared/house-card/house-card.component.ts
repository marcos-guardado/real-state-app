import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProperty } from 'src/app/interfaces/property.interface';

@Component({
  selector: 'app-house-card',
  templateUrl: './house-card.component.html',
  styleUrls: ['./house-card.component.css'],
})
export class HouseCardComponent implements OnInit {
  @Input() house!: IProperty;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  seePropertyDetails(id: string) {
    this.router.navigate(['details', id]);
  }
}
