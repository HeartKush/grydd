import { Component, OnInit } from '@angular/core';
import { User } from '../../../core/models/user.models';
import { Enterprise } from '../../../core/models/enterprise.models';
import { UserAuth } from '../../../core/models/user_auth.models';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from '../../../core/services/user.service'
import { AuthService } from '../../../core/services/auth.service'
import { EnterpriseService } from 'src/app/core/services/enterprise.service';


@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  currentUserAuth: UserAuth | any = JSON.parse(localStorage.getItem('user')!);
  enterprise: Enterprise | any = JSON.parse(localStorage.getItem('enterprise')!);
  currentUser: User | any = null;
  enterprises: Enterprise [] = [];
  constructor(public afs: AngularFirestore, private _userService: UserService, private _authService: AuthService, public enterpriseService:EnterpriseService) { }

  ngOnInit(): void {
    this.getEnterprises();
    this._userService.getUser(this.currentUserAuth.email).subscribe(data => {
      if (!data.empty) {
        this.currentUser = data.docs[0].data();
        console.log('nombre: ', this.currentUserAuth);
        console.log(this.currentUser);
      }
    })

  }

  getEnterprises(){
    this.enterpriseService.getEnterprises().subscribe(data=>{
      this.enterprises = data;
    })
  }
  

  signOut() {
    this._authService.SignOut();
  }

  /*   getUserData(
      this.userService.getCurrentUser(this.currentUser.email).subscribe(
        (data: any) =>{
          this.currentUser = 
        }
      )
    ) */

}
