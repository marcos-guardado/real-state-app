import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CardModule} from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';

@NgModule({
  declarations: [],
  imports: [CommonModule, MenuModule, MenubarModule, CarouselModule,CardModule],
  exports: [MenuModule, MenubarModule, CarouselModule,CardModule],
})
export class NgPrimeModule {}
