import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Campus } from 'src/app/core/models/campus.models';
import { Enterprise } from 'src/app/core/models/enterprise.models';
import { CampusService } from 'src/app/core/services/campus.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-campus',
  templateUrl: './campus.component.html',
  styleUrls: ['./campus.component.sass']
})
export class CampusComponent implements OnInit {

  campus: Campus [] = [];
  form: FormGroup = new FormGroup({});
  enterprise: Enterprise | any = JSON.parse(localStorage.getItem('enterprise')!);
 
  constructor(
    private router:Router,
    private formBuilder: FormBuilder,
    private _campusService: CampusService,
    private activedRouter:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getCampus();
    this.buildForm();
   
  }

  getCampus(){
    this._campusService.getCampus(this.enterprise.nit).subscribe((data:any | Campus [])=>{
      if (data){
        this.campus = data
      } 
    })
  }

  buildForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      enterprise: ['', Validators.required],
      latitude: ['', [Validators.required]],
      longitude: ['', Validators.required],
      state: ['', Validators.required],
    })
  }

  invalidField(field: string) {
    return this.form.get(field)?.invalid && this.form.get(field)?.touched;
  }

  newCampus(){
    console.log('se creo la nueva sede')
  }

  
}
