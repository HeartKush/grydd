import { Injectable } from '@angular/core';
import {
  AngularFirestore, AngularFirestoreDocument
} from '@angular/fire/compat/firestore';
import { User } from '../models/user.models';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public afs: AngularFirestore) { }

  getUser(email:string){
    return this.afs.collection("users",ref => ref.where("email", '==', email))
    .get();
  }

  setUser(user:User){
    const UsersRef: AngularFirestoreDocument<any> = this.afs.doc(
      `enterprises/${user.email}`
    );
    return UsersRef.set(user, {
      merge: true,
    });
  }

  deleteUser(user:User){
    const UsersRef: AngularFirestoreDocument<any> = this.afs.doc(
      `enterprises/${user.email}`
    );
    return UsersRef.delete()
  }
}
