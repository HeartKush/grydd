import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { Campus } from '../models/campus.models';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CampusService {

  constructor(public afs: AngularFirestore, public userService: UserService ) { }

  getCampusData(id: number){
    return this.afs.collection("campus",ref => ref.where("id", '==', id)
    .where("state","==",true))
    .get();
  }

  getCampus(enterpriseNit: number){
    return this.afs.collection<Campus>('campus', ref => ref.where("enterprise", '==', enterpriseNit)).snapshotChanges()
    .pipe(
      map(arreglo => arreglo.map(element => {
        return {
          id: element.payload.doc.id,
          ...element.payload.doc.data() as Campus
        }
      }))
    )
  }
  addCampusData(campus: Campus){
    this.afs.collection<Campus>('campus').add(campus)
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }

  setCampusData(campus: Campus){
    const CampusRef: AngularFirestoreDocument<any> = this.afs.doc(
      `campus/${campus.id}`
    );
    return CampusRef.set(campus, {
      merge: true,
    });
  }

  deleteCampus(campus:Campus){
    const CampusRef: AngularFirestoreDocument<any> = this.afs.doc(
      `campus/${campus.id}`
    );
    return CampusRef.delete()
  }
}
