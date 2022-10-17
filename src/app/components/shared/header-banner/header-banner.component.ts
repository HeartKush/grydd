import { Component, OnInit } from '@angular/core';
import { Enterprise } from 'src/app/core/models/enterprise.models';

@Component({
  selector: 'app-header-banner',
  templateUrl: './header-banner.component.html',
  styleUrls: ['./header-banner.component.sass']
})
export class HeaderBannerComponent implements OnInit {

  enterprise: Enterprise | any = JSON.parse(localStorage.getItem('enterprise')!);

  constructor() { }

  ngOnInit(): void {
  }

}
