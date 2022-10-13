import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  form: FormGroup =  new FormGroup({});

  constructor(private formBuilder: FormBuilder, private router: Router, public authService: AuthService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(){
    this.form = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',Validators.required]
    })
  }

  login():any{
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return false;
    }
    this.authService.SignIn(this.form.value.email, this.form.value.password)
  }

  invalidField(field: string){
    return this.form.get(field)?.invalid && this.form.get(field)?.touched;
  }

}
