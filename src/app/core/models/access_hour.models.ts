import { Time } from "@angular/common";
import { Campus } from "./campus.models";
import { User } from "./user.models";

export class AccesHour {
        campus?: Campus;
        startTime?:Time; 
        endTime?:Time;
        employee?:User;
    }
  