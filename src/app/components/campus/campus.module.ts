import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampusRoutingModule } from './campus-routing.module';
import { CampusComponent } from './campus.component';
import { AccessHoursComponent } from './access-hours/access-hours.component';
import { SharedModule } from '../shared/shared.module';
import { CampusCardComponent } from './campus-card/campus-card.component';
import { AdminModule } from '../admin/admin.module';


@NgModule({
  declarations: [
    CampusComponent,
    AccessHoursComponent,
    CampusCardComponent
  ],
  imports: [
    CommonModule,
    CampusRoutingModule,
    SharedModule
  ],
  exports: [
    CampusComponent
  ]
})
export class CampusModule { }
