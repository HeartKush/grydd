import { Component, OnInit } from '@angular/core';
import { User } from '../../../core/models/user.models';
import { Enterprise } from '../../../core/models/enterprise.models';
import { UserAuth } from '../../../core/models/user_auth.models';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  currentUserAuth : UserAuth | any = JSON.parse(localStorage.getItem('user')!);
  enterprise : Enterprise | any = JSON.parse(localStorage.getItem('enterprise')!);
  currentUser: User | any = null;
  constructor() { }

  ngOnInit(): void {

  }

  /* getUserData(
    this.userService.getCurrentUser(this.currentUser.email).subscribe(
      (data: any) =>{
        this.currentUser = 
      }
    )
  ) */

}
