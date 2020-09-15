import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {BehaviorSubject, from, Observable} from 'rxjs';
import {User} from "./user.model";
import {filter, map, switchMap, tap} from "rxjs/operators";
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy, OnInit {
  private userDoc: User;
  private user;

  private userCollection: AngularFirestoreCollection<User>;
  private user$ = new BehaviorSubject<any>(null);

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {
    this.userCollection = this.db.collection<User>('user');
  }

  ngOnInit(): void {
  }

  public ngOnDestroy() {
    this.user$.complete();
  }

  public setUser(user) {
    this.user = user;
  }

  public getUser() {
    return this.user;
  }

  public getUser$() {
    return this.user$.asObservable();
  }

  public createUser(uid: string, email: string) {
    return this.db.doc('user/'  + uid).set(this.buildUser(email));
  }

  public getUserDoc$(uid: string): Observable<User> {
      return from(this.db.doc<User>('user/' + uid).get())
        .pipe(
          map(data => data.data() as User),
          tap(user => this.userDoc = user));
  }

  public getUserDoc(): Observable<User> {
    return this.afAuth.user
      .pipe(
        filter(user => !!user),
        switchMap(user => this.getUserDoc$(user.uid)));
  }

  public updateUser(user: User) {
    this.db.doc('user/' + user.uid).update(user);
  }

  public getAllUsers(): Observable<User[]> {
    return this.userCollection.snapshotChanges().pipe(
      map(users => users.map(a => {
        let user = a.payload.doc.data() as User;
        user.uid = a.payload.doc.id;
        return user;
      }))
    );
  }

  public resetUserDoc() {
    this.userDoc = null;
    this.user = null;
    this.user$.next(null);
    console.log(this.userDoc, this.user);
  }

  private buildUser(email:string): User {
    return {
      email: email,
      roles: {
        admin: false,
        staff: true
      },
      permission: false,
      projects: {
        ekt: true,
        itg: false
      }
    }
  }
}
