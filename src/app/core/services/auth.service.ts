import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { UserAuth } from '../models/user_auth.models';
import { EnterpriseService } from './enterprise.service';
import { UserService } from './user.service';
import { User } from '../models/user.models';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; 
  enterprise: any;
  constructor(
    public afs: AngularFirestore, 
    public afAuth: AngularFireAuth, 
    public router: Router,
    public ngZone: NgZone,
    private enterpriseService: EnterpriseService,
    private userService: UserService
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.setSessionData(user);
      } else {
        localStorage.setItem('user', 'null');
        localStorage.setItem('enterprise', 'null');
        JSON.parse(localStorage.getItem('user')!);
        this.router.navigate(['/']);
      }
    });
  }
  
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        
        console.log(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.setSessionData(user);
          }
        });
        window.location.reload();
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }
  
  
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }
  

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: UserAuth = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('enterprise');
      this.router.navigate(['/login']);
    });
  }

  setSessionData(user:any){
    this.userData = user;
    localStorage.setItem('user', JSON.stringify(this.userData));
    JSON.parse(localStorage.getItem('user')!);
    this.enterpriseService.getEnterpriseData(this.userData.email)
    .subscribe((data:any)=>{
      if (!data.empty){
        this.enterprise = data.docs[0].data()
        localStorage.setItem('enterprise', JSON.stringify(data.docs[0].data()))
      }
    })
    this.userService.getUser(this.userData.email).subscribe((res:any)=>{
      if(!res.empty){
        console.log('usuario encontrado')
        localStorage.setItem('userData', JSON.stringify(res.docs[0].data()))
        
      }else{
        console.log('usuario creado')
        console.log(this.enterprise);
        let user: User = {
          name : this.enterprise.adminUser.split(' ') ? this.enterprise.adminUser.split(' ')[0] : 'Admin ' + this.enterprise.enterpriseName,
          lastName :this.enterprise.adminUser.split(' ').length,
          enterpriseName: this.enterprise.enterpriseName,
          address: this.enterprise.address,
          phoneNumber: this.enterprise.phoneNumber,
          email: this.enterprise.email,
          country: this.enterprise.country,
          state: this.enterprise.state,
          city: this.enterprise.city
        }
        localStorage.setItem('userData', JSON.stringify(user))
        this.userService.setUser(user)

      }
      if(this.userData.email == 'andresparra0905@gmail.com'){
        this.router.navigate(['dashboard']);
      }else{
        this.router.navigate(['sedes']);
      }
    })
    
  }
}