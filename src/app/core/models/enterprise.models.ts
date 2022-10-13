export class Enterprise {
    adminUser?:string;
    nit?:number;
    enterpriseName?:string;
    address?:string;
    countryCode?: string;
    phoneNumber?:number;
    email?:string;
    webSite?:string;
    location?:{
      country?:string;
      state?:string;
      city?:string;
    }

  }