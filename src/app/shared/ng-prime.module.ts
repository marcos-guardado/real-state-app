import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import {SelectButtonModule} from 'primeng/selectbutton';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MenuModule,
    MenubarModule,
    CarouselModule,
    CardModule,
    ButtonModule,
    GalleriaModule,
    ProgressSpinnerModule,
    TagModule,
    DialogModule,
    SelectButtonModule
  ],
  exports: [
    MenuModule,
    MenubarModule,
    CarouselModule,
    CardModule,
    ButtonModule,
    GalleriaModule,
    ProgressSpinnerModule,
    TagModule,
    DialogModule,
    SelectButtonModule
  ],
})
export class NgPrimeModule {}
