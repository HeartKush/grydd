export class User {
    name?:string;
    lastName?:string;
    enterpriseName?:string;
    address?:string;
    phoneNumber?:number;
    email?:string;
    location?:{
      country?:string;
      state?:string;
      city?:string;
    }
  }