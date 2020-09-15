import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {from, of} from "rxjs";
import {catchError, filter, map, switchMap, tap} from "rxjs/operators";
import {UserService} from "../../core/user/user.service";
import {error} from "util";

@Component({
  selector: 'tsa-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public loged = false;
  public permission: boolean;

  constructor(private formBuilder: FormBuilder, private afAuth: AngularFireAuth, private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  submit() {
    if(this.loginForm.valid) {
      from(this.afAuth.auth.signInWithEmailAndPassword(this.loginForm.controls.email.value, this.loginForm.controls.password.value))
        .pipe(
          tap(() => this.loged = true),
          switchMap(user => this.userService.getUserDoc$(user.user.uid)),
          map(user => this.permission = user.permission),
          switchMap(() => this.permission ? of(this.permission) : this.afAuth.auth.signOut()),
          filter(permission => !!permission))
        .subscribe(() => this.router.navigate(['dashboard']));
    }
  }

}
