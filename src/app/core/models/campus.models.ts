import { Time } from "@angular/common";

export class Campus {
    id?: number;
    name?:string;
    address?:string;
    email?:string;
    enterpriseName?:string;
    geolocation?:{
      latitute?:string;
      longitude?:string;
    }
    state?:boolean;
  }