import { Time } from '@angular/common';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentSnapshot,
} from '@angular/fire/compat/firestore';
import { AccesHour } from '../models/access_hour.models';
import { Campus } from '../models/campus.models';
import { Enterprise } from '../models/enterprise.models';
@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {

  constructor(public afs: AngularFirestore, ) { }

  getEnterpriseData(email: string){
    return this.afs.collection("enterprises",ref => ref.where("email", '==', email))
    .get();
  }

  setEnterpriseData(enterprise: Enterprise) {
    const EnterpriseRef: AngularFirestoreDocument<any> = this.afs.doc(
      `enterprises/${enterprise.nit}`
    );

    return EnterpriseRef.set(enterprise, {
      merge: true,
    });
  }

  deleteEnterprise(enterprise:Enterprise){
    const EnterpriseRef: AngularFirestoreDocument<any> = this.afs.doc(
      `enterprises/${enterprise.nit}`
    );
    return EnterpriseRef.delete()
  }

  getCampusData(id: number){
    return this.afs.collection("campus",ref => ref.where("id", '==', id)
    .where("state","==",true))
    .get();
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

  getAccessHour(qr_code: string){ 
    let actual_date: Date = new Date();
    let hours:number = actual_date.getHours();
    let minutes:number = actual_date.getMinutes();
    let actual_time: Time= {
      hours: hours,
      minutes: minutes,
    }
    this.afs.collection("access-hours",ref => ref.where("qr_code", '==', qr_code)
    .where('startTime',"<=",actual_time).where('endTime','>=', actual_time)
    )
    .get().subscribe((data:any)=>{
      if(!data.empty){
        let access_hours : AccesHour[] = data.docs.map((access_hour:any)=>{
          return access_hour.data()
        })
        let campus_ids: any[] = access_hours.map((access_hour:any)=>{
          return access_hour.campus_id;
        })
        this.afs.collection("campus",ref => ref.where("id", 'array-contains', campus_ids))
        .get().subscribe((campus_query:any)=>{
          if(!campus_query.empty){
              return true;
          }
          return true
        })
      }
      return false;
    })
  }

  setAccessHour(access_hour: AccesHour){
    const AccesHourRef: AngularFirestoreDocument<any> = this.afs.doc(
      `access-hours/${access_hour.id}`
    );
    let CampusRef:AngularFirestoreDocument<any> = this.afs.doc(
      `campus/${access_hour.campus_id}`);
    let qr_code:string = ''+ access_hour.user_id;
    CampusRef.get().subscribe((data:any)=>{
      if(!data.empty){
        let campus : Campus | any = data.docs[0].data()
        if (campus){
          qr_code += campus.location.latitute + campus.locationlongitude
          access_hour.qr_code = qr_code
        }
      }
      return AccesHourRef.set(access_hour, {
        merge: true,
      });
    })
    
  }
}