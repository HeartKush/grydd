import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { EnterpriseCardComponent } from './enterprise-card/enterprise-card.component';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CampusModule } from '../campus/campus.module'


@NgModule({
  declarations: [
    AdminComponent,
    EnterpriseCardComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CampusModule
  ]
})
export class AdminModule { }
