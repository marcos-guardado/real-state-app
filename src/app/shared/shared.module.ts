import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgPrimeModule } from './ng-prime.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HouseCardComponent } from './house-card/house-card.component';

@NgModule({
  declarations: [NavbarComponent, HouseCardComponent],
  imports: [CommonModule, NgPrimeModule],
  exports: [NavbarComponent,HouseCardComponent],
})
export class SharedModule {}
