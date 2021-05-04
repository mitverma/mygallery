import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GalleryListPageRoutingModule } from './gallery-list-routing.module';

import { GalleryListPage } from './gallery-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GalleryListPageRoutingModule
  ],
  declarations: [GalleryListPage]
})
export class GalleryListPageModule {}
