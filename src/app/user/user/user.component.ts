import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {User} from "../../core/user/user.model";
import {UserService} from "../../core/user/user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'tsa-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  public users: User[];
  public editUser: string[] = [];

  private subscriptions: Subscription[] = [];

  constructor(private afAuth: AngularFireAuth, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.subscriptions.push(this.getUsers());
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public logOut() {
    this.afAuth.auth.signOut().then(() => this.router.navigate(['login']));
  }

  public showRelavantObjects(object: { [name: string]: boolean }): string {
    return this.getKeys(object).filter(key => object[key]).join(', ');
  }

  public edit(id: string) {
    console.log(id, this.editUser, this.users);
    if(this.editUser.includes(id)) {
      console.log('??')
      this.userService.updateUser(this.users.find(user => user.uid === id));
      this.editUser = this.editUser.filter(user => user !== id);
    } else {
      this.editUser.push(id);
    }
  }

  public editing(id: string){
    return this.editUser.includes(id);
  }

  public onChange(prop: string, changed: string, editor: string, value: boolean) {
    this.users.find(user => user.uid === changed)[prop][editor] = value;
  }

  public permssionChange(changed: string, value: boolean) {
    this.users.find(user => user.uid === changed).permission = value;
  }

  public getKeys(object: { [role: string]: boolean }): string[] {
    return Object.keys(object);
  }

  public goToDashboard() {
    this.router.navigate(['dashboard']);
  }

  private getUsers() {
    return this.userService.getAllUsers()
      .subscribe(users => this.users = users);
  }
}
