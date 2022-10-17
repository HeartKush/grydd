import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessHoursComponent } from './access-hours/access-hours.component';
import { CampusComponent } from './campus.component';

const routes: Routes = [
  {path: '', component: CampusComponent},
  {path:'horarios-de-acceso', component: AccessHoursComponent} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampusRoutingModule { }
