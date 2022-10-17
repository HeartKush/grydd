import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Enterprise } from 'src/app/core/models/enterprise.models';
import { EnterpriseService } from 'src/app/core/services/enterprise.service';

@Component({
  selector: 'app-campus',
  templateUrl: './campus.component.html',
  styleUrls: ['./campus.component.sass']
})
export class CampusComponent implements OnInit {

  enterprises: Enterprise[] = [];

  enterprise: Enterprise | any = JSON.parse(localStorage.getItem('enterprise')!);
 
  constructor(
    private router:Router,
    private _enterpriseService: EnterpriseService,
    private activedRouter:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getEnterprises();
   
  }

  getEnterprises(){
    this._enterpriseService.getEnterprises().subscribe(data=>{
      this.enterprises = data;
    })
  }

  getEnterpriseByname(){
   
  }

  
}
