import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Enterprise } from 'src/app/core/models/enterprise.models';
import { EnterpriseService } from 'src/app/core/services/enterprise.service';


@Component({
  selector: 'app-enterprise-card',
  templateUrl: './enterprise-card.component.html',
  styleUrls: ['./enterprise-card.component.sass']
})
export class EnterpriseCardComponent implements OnInit {

  enterprises: Enterprise[] = [];

  constructor(
    private router:Router,
    private _enterpriseService: EnterpriseService
  ) { }

  ngOnInit(): void {
    this.getEnterprises();
  }

  getEnterprises(){
    this._enterpriseService.getEnterprises().subscribe(data=>{
      this.enterprises = data;
    })
  }

  verSedes(enterpriseName:any){
    this.router.navigate(['/sedes']);
  }

}
