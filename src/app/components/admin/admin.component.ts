import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Enterprise } from '../../core/models/enterprise.models';
import { CountryCode } from 'src/app/core/models/country_code.models';
import { CodesService } from 'src/app/core/services/codes.service';
import { EnterpriseService } from 'src/app/core/services/enterprise.service';
import { UserAuth } from 'src/app/core/models/user_auth.models';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {
  countryCodes: CountryCode[] = [];
  modalTitle: string = 'nueva empresa';
  selectedEnterprise: Enterprise = {
    adminUser: '',
    nit: undefined,
    enterpriseName: '',
    address: '',
    countryCode: '',
    phoneNumber: undefined,
    email: '',
    webSite: '',
    country: '',
    state: '',
    city: '',

  };
  mainEnterprise: Enterprise = {
    adminUser: '',
    nit: undefined,
    enterpriseName: '',
    address: '',
    countryCode: '',
    phoneNumber: undefined,
    email: '',
    webSite: '',
    country: '',
    state: '',
    city: '',

  };
  form: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private codesService: CodesService,
    private enterpriseService: EnterpriseService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getEnterprice();
    this.buildForm();
    this.getCodes();
  }
  getCodes() {
    this.codesService.getCodes()
      .subscribe((data: [CountryCode]) => {
        this.countryCodes = data;
        console.log(data)
      });
  }

  buildForm() {
    this.form = this.formBuilder.group({
      adminUser: [this.selectedEnterprise.adminUser, Validators.required],
      nit: [this.selectedEnterprise.nit, Validators.required],
      enterpriseName: [this.selectedEnterprise.enterpriseName, Validators.required],
      address: [this.selectedEnterprise.address, Validators.required],
      countryCode: [this.selectedEnterprise.countryCode, Validators.required],
      phoneNumber: [this.selectedEnterprise.phoneNumber, [Validators.required, Validators.pattern("[0-9 ]{10}")]],
      email: [this.selectedEnterprise.email, Validators.required, Validators.email],
      webSite: [this.selectedEnterprise.webSite, Validators.required],
      country: [this.selectedEnterprise.country, Validators.required],
      state: [this.selectedEnterprise.state, Validators.required],
      city: [this.selectedEnterprise.city, Validators.required],

    })
  }

  getEnterprice() {
    let user: UserAuth = JSON.parse(localStorage.getItem('user')!);
    if (user) {
      this.mainEnterprise = JSON.parse(localStorage.getItem('enterprise')!);
    }
  }

  newEnterprise(): any {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }
    console.log('valid');
    this.selectedEnterprise = this.form.value;
    this.enterpriseService.setEnterpriseData(this.form.value);
    this.selectedEnterprise = {
      adminUser: '',
      nit: undefined,
      enterpriseName: '',
      address: '',
      countryCode: '',
      phoneNumber: undefined,
      email: '',
      webSite: '',
      country: '',
      state: '',
      city: '',

    };
    this.form.reset();

  }

  invalidField(field: string) {
    return this.form.get(field)?.invalid && this.form.get(field)?.touched;
  }

}
