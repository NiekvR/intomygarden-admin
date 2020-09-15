import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {from} from "rxjs";
import {UserService} from "../../core/user/user.service";
import {tap} from "rxjs/operators";

@Component({
  selector: 'tsa-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private afAuth: AngularFireAuth, private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  public submit() {
    if(this.signupForm.valid) {
      from(this.afAuth.auth.createUserWithEmailAndPassword(this.signupForm.controls.email.value, this.signupForm.controls.password.value))
        .pipe(
          tap(user => this.userService.createUser(user.user.uid, this.signupForm.controls.email.value)),
          tap(() => this.afAuth.auth.signOut()))
        .subscribe(() => this.router.navigate(['login']));
    }
  }

}
