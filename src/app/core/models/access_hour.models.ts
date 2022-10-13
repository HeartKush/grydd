import { Time } from "@angular/common";
import { User } from "./user.models";

export class AccesHour {
    id?: number;
    campus_id?: number;
    startTime?:Time; 
    endTime?:Time;
    user_id?: number;
    qr_code?: string;
}
  