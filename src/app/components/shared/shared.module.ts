import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HeaderBannerComponent } from './header-banner/header-banner.component';



@NgModule({
  declarations: [
    HeaderComponent,
    HeaderBannerComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HeaderComponent,
    HeaderBannerComponent
  ]
})
export class SharedModule { }
