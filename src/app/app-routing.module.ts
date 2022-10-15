import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'login', loadChildren: () => import ('./components/login/login.module').then(m => m.LoginModule)},
  {path: 'dashboard', loadChildren: () => import ('./components/admin/admin.module').then(m => m.AdminModule)},
  {path: 'sedes', loadChildren: () => import ('./components/campus/campus.module').then(m => m.CampusModule)},
  {path: '**', pathMatch:'full', redirectTo: 'login'},
  {path: '', pathMatch:'full', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
